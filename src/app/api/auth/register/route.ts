export async function POST (request: Request) {
    const data = {message : `Submission Received!`};
    
    return Response.json(
        data
    );
}