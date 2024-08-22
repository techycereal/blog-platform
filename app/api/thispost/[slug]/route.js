import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import {connect} from '../../../lib/databaseUtil'
export async function GET(request, { params }) { 
    try{
        const database = await connect('posts')
        const query = await database.collection('post').findOne({_id: new ObjectId(params.slug)})
        console.log(query)
        return NextResponse.json({data: query})
    } catch(err) {
        console.log(err)
    }
}