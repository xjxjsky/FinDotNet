using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DematicBusiness
{
    //基础运算类和继承
    public class Addition : Operation
    {
        //public override double Execute() => Values.Sum() + NestedOperations.Sum(op => op.Execute());
        public override double Execute()
        {
            double sum = Values.Sum(); // 计算所有值的总和
            foreach (var nestedOperation in NestedOperations)
            {
                sum += nestedOperation.Execute(); // 加上嵌套操作的结果
            }
            return sum;
        }
    }
}