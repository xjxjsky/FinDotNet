using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DematicBusiness
{
    //基础运算类和继承
    public class Multiplication : Operation
    {
        //public override double Execute() => Values.Aggregate(1.0, (acc, val) => acc * val) * NestedOperations.Aggregate(1.0, (acc, op) => acc * op.Execute());
        public override double Execute()
        {
            double product = Values.Count > 0 ? Values.Aggregate(1.0, (acc, val) => acc * val) : 0; // Compute all the values
            foreach (var nestedOperation in NestedOperations)
            {
                product *= nestedOperation.Execute(); // 乘上嵌套操作的结果
            }
            return product;
        }
    }
}