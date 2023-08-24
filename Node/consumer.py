import pika

callback = lambda ch, method, properties, body: print(f" [x] Received {body}")

rabbitmq_server = '192.168.1.124'
rabbitmq_port = 5672

rabbitmq_credentials = pika.PlainCredentials('guest', 'guest')

connection = pika.BlockingConnection(pika.ConnectionParameters(
    host=rabbitmq_server, 
    port=rabbitmq_port,
    credentials=rabbitmq_credentials
))

channel = connection.channel()

# Create a queue named 'hello'
channel.queue_declare(queue='hello')
channel.basic_consume(queue='hello', on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()