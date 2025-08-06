import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { investmentFocus, geographicRegion, riskTolerance, specificKeywords } = body;

    if (!investmentFocus) {
      return NextResponse.json({ error: 'Missing required investment focus.' }, { status: 400 });
    }

    const simulatedSearchQueries = [
      `top airline stocks for ${investmentFocus} ${geographicRegion ? `in ${geographicRegion}` : ''}`,
      `airline industry financial health ${geographicRegion ? `in ${geographicRegion}` : ''}`,
      `best ${riskTolerance} risk airline investments`,
      `airline companies with ${specificKeywords || 'strong performance'}`,
    ].filter(Boolean);

    const mockSearchResults = {
      "query_1_result": {
        "snippet": "Delta Air Lines (DAL) and Southwest Airlines (LUV) show strong growth potential in the North American market due to increasing travel demand.",
        "source": "Investopedia.com"
      },
      "query_2_result": {
        "snippet": "Ryanair (RYAAY) and Wizz Air (WIZZ) are leading low-cost carriers in Europe, demonstrating robust financial health and expansion plans.",
        "source": "FinancialTimes.com"
      },
      "query_3_result": {
        "snippet": "Singapore Airlines (C6L.SI) is a key player in Asia-Pacific, known for its premium services and strategic partnerships.",
        "source": "Bloomberg.com"
      }
    };

    const simulatedMarketAnalysis = `Based on your focus on ${investmentFocus} with a ${riskTolerance} risk tolerance, and considering the simulated market data, the airline industry shows varied opportunities.`;
    const simulatedRecommendedStocks = [
      "Delta Air Lines (DAL) - Strong growth potential in North America.",
      "Ryanair (RYAAY) - Robust low-cost carrier in Europe.",
      "Singapore Airlines (C6L.SI) - Premium service leader in Asia-Pacific.",
    ];

    return NextResponse.json({
      searchQueries: simulatedSearchQueries,
      mockSearchResults,
      marketAnalysis: simulatedMarketAnalysis,
      recommendedStocks: simulatedRecommendedStocks,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error during analysis.' }, { status: 500 });
  }
}