export const dynamic = 'force-dynamic'
import {connect} from '../../../lib/databaseUtil'
import { NextResponse } from 'next/server';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version


export async function GET(request, {params}) { 
    try{
        const database = await connect('profile')
        const query = await database.collection('profile').findOne({'_id': params.slug})
        console.log(query)
        return NextResponse.json({data: query})
    } catch(err) {
        console.log(err)
    }
}