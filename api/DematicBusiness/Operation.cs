using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DematicBusiness
{
    public abstract class Operation
    {
        public List<double> Values { get; set; } = new();
        public List<Operation> NestedOperations { get; set; } = new();

        // 抽象方法，供子类实现具体的操作逻辑
        public abstract double Execute();
    }
}