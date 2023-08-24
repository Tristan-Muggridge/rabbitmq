import * as amqp from 'amqplib';

async function publishMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'hello';
    const msg = 'Hello from Typescript';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`Message: ${msg} sent to queue: ${queue}`);

    await channel.close();
    await connection.close();
}

publishMessage();