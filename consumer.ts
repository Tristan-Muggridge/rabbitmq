import * as amqp from 'amqplib';

async function consumeMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });

    console.log(`Waiting for messages in queue: ${queue}`);

    channel.consume(queue, (msg) => {
        !!msg && console.log(`Received message: ${msg.content.toString()}`);
        channel.ack(msg as amqp.Message);
    })

    console.debug('Waiting for messages...');
}

consumeMessage().catch(console.error);