using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DematicBusiness
{
    //Basic arithmetic classes and inheritance
    public class Addition : Operation
    {
        //public override double Execute() => Values.Sum() + NestedOperations.Sum(op => op.Execute());
        public override double Execute()
        {
            double sum = Values.Sum(); // Calculate the sum of all values
            foreach (var nestedOperation in NestedOperations)
            {
                sum += nestedOperation.Execute(); // Add the result of the nested operation
            }
            return sum;
        }
    }
}