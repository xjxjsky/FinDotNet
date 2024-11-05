using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DematicBusiness
{
    //Implement recursion and exception handling
    public class Calculator : ICalculator
    {
        public double Calculate(Operation operation)
        {
            try
            {
                return operation.Execute();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error during calculation", ex);
            }
        }
    }
}