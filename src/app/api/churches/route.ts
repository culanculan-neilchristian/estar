import { NextRequest, NextResponse } from 'next/server';
import { BigQueryDataService } from '@/services/bigquery-data-service';

/**
 * API Route to fetch filtered church data from the BigQuery
 * Query Params: ?province=...&district=...
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const province = searchParams.get('province');
    const district = searchParams.get('district');

    let data = await BigQueryDataService.getAllChurches();

    if (province) {
      data = data.filter((item) => item.province === province);
    }

    if (district) {
      data = data.filter((item) => item.amphoe === district);
    }

    // Limit output to prevent huge payloads over the network
    const limit = parseInt(searchParams.get('limit') || '100');
    const paginatedData = data.slice(0, limit);

    return NextResponse.json({
      total: data.length,
      count: paginatedData.length,
      data: paginatedData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch church data' }, { status: 500 });
  }
}
