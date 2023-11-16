import AWS from 'aws-sdk';
import dayjs from 'dayjs';

AWS.config.update({
	region: process.env.NEXT_PUBLIC_AWS_REGION,
	accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
	secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
});

const docClient = new AWS.DynamoDB.DocumentClient();

export const setClientInfo = (info: { ip: string; country_name: string; city: string;}) => {
	const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
	const params = {
		TableName: 'clientInfo',
		Item: {
			ip: info.ip,
			enterTime: currentTime,
			country_name: info.country_name,
			city: info.city
		}
	};

	docClient.put(params, (err, data) => {
		if (err) console.log(err);
	});
};
