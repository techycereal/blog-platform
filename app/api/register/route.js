import { NextResponse } from 'next/server';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
import {connect} from '../../lib/databaseUtil'

export async function POST(request) { 
    try{
        const data = await request.json()
        console.log(data)
        const database = await connect('profile')
        await database.collection('profile').insertOne({uname: data.username, name: data.name, _id: data.uid})
        return NextResponse.json({data: 'success'})
    } catch(err) {
        console.log(err)
    }
}