from flask import Flask, json, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from config import config
import requests



app = Flask(__name__)
con = MySQL(app)

CORS(app, origins="http://localhost:4200")



@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'API funcionando correctamente'})
@app.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    cursor = con.connection.cursor()
    sql = "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (data['name'], data['email'], data['password'], 'client'))
    con.connection.commit()
    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

@app.route('/users', methods=['GET'])
def get_users():
    cursor = con.connection.cursor()
    sql = "SELECT id, name, email, role FROM users"
    cursor.execute(sql)
    users = cursor.fetchall() 
    user_list = [
        {'id': user[0], 'name': user[1], 'email': user[2], 'role': user[3]}
        for user in users
    ]
    return jsonify(user_list), 200

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    cursor = con.connection.cursor()
    sql = "SELECT id, name, role FROM users WHERE email = %s AND password = %s"
    cursor.execute(sql, (data['email'], data['password']))
    user = cursor.fetchone()
    if user:
        return jsonify({'user': {'id': user[0], 'name': user[1], 'role': user[2]}})
    return jsonify({'message': 'Credenciales incorrectas'}), 401

@app.route('/ads', methods=['POST'])
def add_ad():
    data = request.json
    cursor = con.connection.cursor()
    sql = "INSERT INTO ads (name, duration) VALUES (%s, %s)"
    cursor.execute(sql, (data['name'], data['duration']))
    con.connection.commit()
    return jsonify({'message': 'Anuncio agregado exitosamente'}), 201

@app.route('/ads', methods=['GET'])
def get_ads():
    cursor = con.connection.cursor()
    cursor.execute("SELECT id, name, duration FROM ads")
    ads = cursor.fetchall()
    ads_list = [{'id': ad[0], 'name': ad[1], 'duration': ad[2]} for ad in ads]
    return jsonify(ads_list), 200
@app.route('/ads/<int:id>', methods=['DELETE'])
def delete_ad(id):
    cursor = con.connection.cursor()
    cursor.execute("DELETE FROM ads WHERE id = %s", (id,))
    con.connection.commit()
    return jsonify({'message': f'Anuncio con ID {id} eliminado correctamente'}), 200
@app.route('/ads/<int:id>', methods=['PUT'])
def update_ad(id):
    data = request.json
    cursor = con.connection.cursor()
    sql = "UPDATE ads SET name = %s, duration = %s WHERE id = %s"
    cursor.execute(sql, (data['name'], data['duration'], id))
    con.connection.commit()
    return jsonify({'message': f'Anuncio con ID {id} actualizado correctamente'}), 200


@app.route('/ads/<int:id>/view', methods=['PUT'])
def increment_views(id):
    cursor = con.connection.cursor()
    sql = "UPDATE ads SET views = views + 1 WHERE id = %s"
    cursor.execute(sql, (id,))
    con.connection.commit()
    return jsonify({'message': 'Vista registrada exitosamente'}), 200

@app.route('/downloads', methods=['POST'])
def add_download():
    data = request.json
    cursor = con.connection.cursor()
    sql = "INSERT INTO downloads (user_id) VALUES (%s)"
    cursor.execute(sql, (data['user_id'],))
    con.connection.commit()
    return jsonify({'message': 'Descarga registrada exitosamente'}), 201


@app.route('/store/download', methods=['GET'])
def download_demo():
    try:
        cursor = con.connection.cursor()

        sql_demo = """
            INSERT INTO downloads (file_name, download_type, downloaded_at)
            VALUES (%s, %s, NOW())
        """
        cursor.execute(sql_demo, ('Logicraft().apk', 'demo'))
        con.connection.commit()

        return app.send_static_file('Logicraft().apk')  
    except Exception as e:
        print(f"Error al procesar la descarga de la demo: {e}")
        return jsonify({'message': 'Error al descargar la demo.'}), 500




@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        cursor = con.connection.cursor()
        sql = "DELETE FROM users WHERE id = %s"
        cursor.execute(sql, (id,))
        con.connection.commit()
        return jsonify({'message': f'Usuario con ID {id} eliminado correctamente'}), 200
    except Exception as e:
        print(f"Error al eliminar usuario: {e}")
        return jsonify({'message': 'Error al eliminar usuario'}), 500
    
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        data = request.json
        cursor = con.connection.cursor()
        
        sql = """
            UPDATE users
            SET name = %s, email = %s, role = %s
            WHERE id = %s
        """
        cursor.execute(sql, (data['name'], data['email'], data['role'], id))
        con.connection.commit()
        return jsonify({'message': f'Usuario con ID {id} actualizado correctamente'}), 200
    except Exception as e:
        print(f"Error al actualizar usuario: {e}")
        return jsonify({'message': 'Error al actualizar usuario'}), 500


@app.route('/users', methods=['POST'])
def add_user():
    try:
        data = request.json
        cursor = con.connection.cursor()
        sql = """
            INSERT INTO users (name, email, role, password)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (data['name'], data['email'], data['role'], 'default_password'))
        con.connection.commit()
        return jsonify({'message': 'Usuario agregado correctamente'}), 201
    except Exception as e:
        print(f"Error al agregar usuario: {e}")
        return jsonify({'message': 'Error al agregar usuario'}), 500
    

@app.route('/stats', methods=['GET'])
def get_statistics():
    try:
        cursor = con.connection.cursor()

        cursor.execute("SELECT COUNT(*) FROM downloads")
        total_downloads = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM ads")
        total_ads = cursor.fetchone()[0]

        cursor.execute("SELECT COALESCE(SUM(duration), 0) FROM ads")
        total_ad_time = cursor.fetchone()[0]

        return jsonify({
            'total_downloads': total_downloads,
            'total_ads': total_ads,
            'total_ad_time': total_ad_time
        }), 200
    except Exception as e:
        print(f"Error al obtener estadísticas: {e}")
        return jsonify({'message': 'Error al obtener estadísticas'}), 500
    
@app.route('/payments/process', methods=['POST'])
def process_payment():
    try:
        data = request.json
        cursor = con.connection.cursor()

        if data['method'] not in ['oxxo', 'tarjeta']: 
            return jsonify({'message': 'Método de pago no soportado'}), 400

        amount = 199

        sql_payment = """
            INSERT INTO payments (method, amount, status)
            VALUES (%s, %s, %s)
        """
        cursor.execute(sql_payment, (data['method'], amount, 'completed'))
        payment_id = cursor.lastrowid  

        if data['method'] == 'tarjeta':
            sql_card = """
                INSERT INTO payment_details (payment_id, card_name, card_number, cvv, expiry_date, bank)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql_card, (
                payment_id,
                data['card_name'],
                data['card_number'],
                data['cvv'],
                data['expiry_date'],
                data['bank']
            ))
        elif data['method'] == 'oxxo':
            oxxo_reference = f"OXXO-{payment_id}-{data.get('user_id', 'unknown')}" 
            sql_oxxo = """
                INSERT INTO payment_details (payment_id, oxxo_reference)
                VALUES (%s, %s)
            """
            cursor.execute(sql_oxxo, (payment_id, oxxo_reference))

        con.connection.commit()

        
        if data['method'] == 'oxxo':
            return jsonify({
                'message': f"Pago procesado por OXXO para {amount} MXN",
                'payment_id': payment_id, 
                'reference': oxxo_reference
            }), 200
        else:
            return jsonify({
                'message': f"Pago procesado por Tarjeta para {amount} MXN",
                'payment_id': payment_id 
            }), 200

    except Exception as e:
        print(f"Error al procesar el pago: {e}")
        return jsonify({'message': 'Error al procesar el pago'}), 500


@app.route('/payments', methods=['GET'])
def get_payments():
    try:
        cursor = con.connection.cursor()

        
        cursor.execute("SELECT id, method, amount, status, created_at FROM payments")
        payments = cursor.fetchall()

        
        payment_list = [
            {
                'id': payment[0],
                'method': payment[1],
                'amount': payment[2],
                'status': payment[3],
                'created_at': payment[4]
            }
            for payment in payments
        ]

        return jsonify(payment_list), 200
    except Exception as e:
        print(f"Error al obtener pagos: {e}")
        return jsonify({'message': 'Error al obtener pagos'}), 500
    
@app.route('/payments/<int:id>', methods=['DELETE'])
def delete_payment(id):
    try:
        cursor = con.connection.cursor()

      
        cursor.execute("DELETE FROM payments WHERE id = %s", (id,))
        con.connection.commit()

        return jsonify({'message': f'Pago con ID {id} eliminado correctamente'}), 200
    except Exception as e:
        print(f"Error al eliminar pago: {e}")
        return jsonify({'message': 'Error al eliminar el pago'}), 500

@app.route('/store/download-full', methods=['POST'])
def download_full():
    try:
        data = request.json
        cursor = con.connection.cursor()

        sql = "SELECT id FROM payments WHERE id = %s AND method = 'tarjeta'"
        cursor.execute(sql, (data['payment_id'],))
        payment = cursor.fetchone()

        if not payment:
            return jsonify({'message': 'No se encontró un pago válido con tarjeta.'}), 403

        sql_full = """
            INSERT INTO downloads (payment_id, file_name, download_type, downloaded_at)
            VALUES (%s, %s, %s, NOW())
        """
        cursor.execute(sql_full, (data['payment_id'], 'Logicraft_full.apk', 'full'))
        con.connection.commit()

        return app.send_static_file('Logicraft.apk')  
    except Exception as e:
        print(f"Error al procesar la descarga completa: {e}")
        return jsonify({'message': 'Error al procesar la descarga completa.'}), 500
    
@app.route('/users/search', methods=['GET'])
def search_users():
    query = request.args.get('name', '').lower()  # Obtener el parámetro 'name' de la consulta
    cursor = con.connection.cursor()
    sql = "SELECT id, name, email, role FROM users WHERE LOWER(name) LIKE %s"
    cursor.execute(sql, ('%' + query + '%',))
    users = cursor.fetchall()
    user_list = [
        {'id': user[0], 'name': user[1], 'email': user[2], 'role': user[3]}
        for user in users
    ]
    return jsonify(user_list), 200


@app.route('/api/payment-stats', methods=['GET'])
def get_payment_stats():
    cursor = con.connection.cursor()
    sql = """
        SELECT 
            SUM(CASE WHEN method = 'oxxo' THEN 1 ELSE 0 END) AS oxxo_count,
            SUM(CASE WHEN method = 'tarjeta' THEN 1 ELSE 0 END) AS card_count
        FROM payments
    """
    cursor.execute(sql)
    result = cursor.fetchone()

    # Devuelve el resultado como un JSON
    return jsonify({
        'oxxo': result[0], 
        'card': result[1]  # Esto ahora corresponde a 'tarjeta'
    }), 200


@app.route('/api/user-stats', methods=['GET'])
def get_user_stats():
    cursor = con.connection.cursor()
    sql = """
        SELECT 
            role, COUNT(*) AS count
        FROM users
        GROUP BY role
    """
    cursor.execute(sql)
    results = cursor.fetchall()

    # Convertir el resultado a un formato JSON
    data = {row[0]: row[1] for row in results}
    return jsonify(data), 200

@app.route('/api/download-stats', methods=['GET'])
def get_download_stats():
    cursor = con.connection.cursor()
    sql = """
        SELECT 
            download_type, COUNT(*) AS count
        FROM downloads
        GROUP BY download_type
    """
    cursor.execute(sql)
    results = cursor.fetchall()

    # Convertir los resultados a un formato JSON
    data = {row[0]: row[1] for row in results}
    return jsonify(data), 200

@app.route('/api/register', methods=['POST'])
def register_api():
    data = request.json
    cursor = con.connection.cursor()
    sql = "INSERT INTO apis (name, location) VALUES (%s, %s)"
    cursor.execute(sql, (data['name'], data['location']))
    con.connection.commit()
    return jsonify({'message': 'API registrada exitosamente'}), 201


@app.route('/api/list', methods=['GET'])
def get_apis():
    cursor = con.connection.cursor()
    cursor.execute("SELECT id, name, location FROM apis")
    apis = cursor.fetchall()
    apis_list = [
        {'id': api[0], 'name': api[1], 'location': api[2]}
        for api in apis
    ]
    return jsonify(apis_list), 200

@app.route('/api/delete/<int:id>', methods=['DELETE'])
def delete_api(id):
    cursor = con.connection.cursor()
    sql = "DELETE FROM apis WHERE id = %s"
    cursor.execute(sql, (id,))
    con.connection.commit()
    return jsonify({'message': f'API con ID {id} eliminada correctamente'}), 200

@app.route('/api/update/<int:id>', methods=['PUT'])
def update_api(id):
    data = request.json
    cursor = con.connection.cursor()
    sql = "UPDATE apis SET name = %s, location = %s WHERE id = %s"
    cursor.execute(sql, (data['name'], data['location'], id))
    con.connection.commit()
    return jsonify({'message': f'API con ID {id} actualizada correctamente'}), 200

# Error 404
def pagina_no_encontrada(error):
    return "<h1>Página no encontrada</h1>", 404

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(host='0.0.0.0', port=5000)


