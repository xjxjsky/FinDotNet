using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DematicBusiness
{
    // Basic arithmetic classes and inheritance
    public class Multiplication: Operation
    {
        //public override double Execute() => Values.Aggregate(1.0, (acc, val) => acc * val) * NestedOperations.Aggregate(1.0, (acc, op) => acc * op.Execute());
        public override double Execute()
        {
            double product = Values.Count > 0 ? Values.Aggregate(1.0, (acc, val) => acc * val) : 0; // Compute all the values
            foreach (var nestedOperation in NestedOperations)
            {
                product *= nestedOperation.Execute(); // Multiply by the result of the nested operation
            }
            return product;
        }
    }
}