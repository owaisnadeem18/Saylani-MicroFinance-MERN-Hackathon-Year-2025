export const calculateLoan = (period , initialDeposit, setInstallmentAmount , setLoading) => {

    console.log("Period => " , period)
    console.log("Initial Deposit => " , initialDeposit) 

    let years = Number(period)
    
    let initialAmount = Number(initialDeposit)
    
    if (!initialAmount) {
        alert("Please Enter Initial Amount")             
        return                                                                                                               
    }

    setLoading(true)

    setTimeout(() => {
           
        const totalMonths = years * 12 

        console.log("total months -> " , totalMonths)
        
        const monthlyInstallment = (initialAmount / totalMonths)                                                                                                                                                
                
        console.log("Initial Amount -> " , monthlyInstallment)
                                                                      
        const roundedInstallment = Math.round(monthlyInstallment) 
        
        setInstallmentAmount(roundedInstallment)  
        setLoading(false)                                                                                                                                                                                    
    }, 3000);                                                                                        

}                                                                                                                                                                                                                                                                                       