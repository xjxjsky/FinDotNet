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

        // Abstract methods that allow subclasses to implement concrete operation logic
        public abstract double Execute();
    }
}