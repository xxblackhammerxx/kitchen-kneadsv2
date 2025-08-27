import { NextRequest, NextResponse } from 'next/server'

interface CalculatorRequest {
  monthlyBill: number
  state: string
  systemSize?: number
}

interface CalculatorResponse {
  systemSize: number
  totalCost: number
  federalTaxCredit: number
  stateTaxCredit: number
  totalIncentives: number
  netCost: number
  monthlyPayment: number
  yearlySavings: number
  paybackPeriod: number
  twentyYearSavings: number
}

export async function POST(request: NextRequest) {
  try {
    const { monthlyBill, state, systemSize }: CalculatorRequest = await request.json()
    
    if (!monthlyBill || monthlyBill <= 0) {
      return NextResponse.json({ error: 'Valid monthly bill is required' }, { status: 400 })
    }
    
    // Calculate system size if not provided
    const calculatedSystemSize = systemSize || (monthlyBill *  12) / 1200 // Rough estimate
    
    // System cost calculation (average $3 per watt)
    const costPerWatt = 3.0
    const totalCost = calculatedSystemSize * 1000 * costPerWatt
    
    // Federal tax credit (30% through 2032)
    const federalTaxCredit = totalCost * 0.30
    
    // State tax credit (varies by state - simplified calculation)
    const stateCredits: { [key: string]: number } = {
      california: 0.20,
      new_york: 0.25,
      massachusetts: 0.15,
      // Add more states as needed
    }
    
    const stateTaxCredit = totalCost * (stateCredits[state.toLowerCase()] || 0.10)
    
    // Total incentives
    const totalIncentives = federalTaxCredit + stateTaxCredit
    
    // Net cost after incentives
    const netCost = totalCost - totalIncentives
    
    // Monthly payment (assuming 20-year loan at 4% APR)
    const monthlyPayment = (netCost * 0.00605) / (1 - Math.pow(1.00605, -240))
    
    // Yearly savings
    const yearlySavings = (monthlyBill * 12) - (monthlyPayment * 12)
    
    // Payback period
    const paybackPeriod = netCost / (monthlyBill * 12)
    
    // 20-year savings
    const twentyYearSavings = (yearlySavings * 20) - netCost
    
    const response: CalculatorResponse = {
      systemSize: calculatedSystemSize,
      totalCost: Math.round(totalCost),
      federalTaxCredit: Math.round(federalTaxCredit),
      stateTaxCredit: Math.round(stateTaxCredit),
      totalIncentives: Math.round(totalIncentives),
      netCost: Math.round(netCost),
      monthlyPayment: Math.round(monthlyPayment),
      yearlySavings: Math.round(yearlySavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      twentyYearSavings: Math.round(twentyYearSavings),
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error calculating solar savings:', error)
    return NextResponse.json({ error: 'Failed to calculate savings' }, { status: 500 })
  }
}