using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DematicBusiness
{
    //实现递归和异常处理
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