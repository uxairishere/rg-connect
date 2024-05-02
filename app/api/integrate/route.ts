import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const request = await req.json();
        const { customerId, loginCode, username, password } = request;

        const payload = {
            auth: { username, password, loginCode },
            customerId,
            type: 'realGreen',
        }

        const response = await fetch(
            `${process.env.SERVER_URL}/integrations`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(payload)
            },
        )

        if(response?.status !== 201){
            console.error('Request failed from server side:', response?.status);
            return NextResponse.json({
                error: 'An error occurred while sending request',
            });
        }

        return NextResponse.json({
            requestSent: true,
            response: 'Request sent',
        });
    } catch (error: any) {
        console.error('Request failed from server side:', error);
        return NextResponse.json({
            error: 'An error occurred while sending request',
        });
    }
}