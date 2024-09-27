using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;
  
        public StockRepository(ApplicationDBContext context)
        {

            _context = context;
        }

        public async Task<Stock> CreateAsync(Stock exitingStock)
        {
            await _context.Stocks.AddAsync(exitingStock);
            await _context.SaveChangesAsync();
            return exitingStock;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var exitingStock = await _context.Stocks.FirstOrDefaultAsync(x=>x.Id == id);

            if(exitingStock == null)
            {
                return null;
            }
            _context.Stocks.Remove(exitingStock);
            await _context.SaveChangesAsync();
            return exitingStock;
        }

        /*Filtering & Sorting & data using Entity Framework*/
        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            var stocks =  _context.Stocks.Include(c=>c.Comments).ThenInclude(a => a.AppUser).AsQueryable();
            if(!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));
            }

            if(!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(s=>s.Symbol.Contains(query.Symbol));
            }

            if(!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if(query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDecsending ? stocks.OrderByDescending(s => s.Symbol) : stocks.OrderBy(s => s.Symbol);
                }
            }
            
            var skipNumber = (query.PageNumber - 1) * query.PageSize; //pagination

            return await stocks.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stocks.Include(c=>c.Comments).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
           return await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol == symbol);
        }

        public Task<bool> StockExists(int id)
        {
            return _context.Stocks.AnyAsync(s => s.Id == id);
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var exitingStock= await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if(exitingStock ==null) return null;
            
            exitingStock.Symbol = stockDto.Symbol;
            exitingStock.CompanyName = stockDto.CompanyName;
            exitingStock.Purchase = stockDto.Purchase;
            exitingStock.LastDiv = stockDto.LastDiv;
            exitingStock.Industry = stockDto.Industry;
            exitingStock.MarketCap = stockDto.MarketCap;

            await _context.SaveChangesAsync();

            return exitingStock;
        }
    }
}

/*
这个方法 `GetAllAsync(QueryObject query)` 是在处理数据库查询，针对 `Stock` 实体进行筛选、排序和分页操作。这里我们逐步解释每一部分代码的功能。

### 1. `var stocks = _context.Stocks.Include(c => c.Comments).ThenInclude(a => a.AppUser).AsQueryable();`

这行代码通过 Entity Framework 从数据库中查询 `Stocks` 表，并在结果中包含与 `Comments` 和 `AppUser` 相关的外键数据。

- `_context.Stocks`：从 `ApplicationDBContext` 中获取 `Stocks` 数据集。
- `.Include(c => c.Comments)`：表明在查询时，除了 `Stock` 表的数据，还要把与 `Stock` 实体关联的 `Comments` 一并加载进来。即，这里是 **急加载** (`Eager Loading`)。
- `.ThenInclude(a => a.AppUser)`：进一步指定对 `Comments` 表进行 **再加载** (`Eager Loading`)，将 `Comments` 表中关联的 `AppUser` 数据也加载进来。
- `.AsQueryable()`：将结果转换为 **可查询的集合**（`IQueryable`），这样可以进一步对查询进行条件过滤和排序等操作。

**作用**：加载 `Stock` 实体及其相关的 `Comments` 和 `AppUser` 数据，使后续操作可以基于这些数据进行筛选、排序和分页处理。

### 2. `if (!string.IsNullOrWhiteSpace(query.CompanyName))`

这里开始检查查询对象 `query` 中的 `CompanyName` 属性。

- `!string.IsNullOrWhiteSpace(query.CompanyName)`：检查 `CompanyName` 是否有值，如果有，就执行接下来的过滤操作。
- `stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));`：如果 `CompanyName` 有值，使用 `Where` 方法在 `stocks` 集合中进行筛选。条件是 `Stock` 的 `CompanyName` 包含传入的 `query.CompanyName` 字符串。
  
**作用**：根据 `query` 中的 `CompanyName` 字符串，过滤出公司名包含该字符串的股票数据。

### 3. `if (!string.IsNullOrWhiteSpace(query.Symbol))`

这部分代码与上一步类似，但针对的是 `Stock` 的 `Symbol` 属性。

- `stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));`：同样使用 `Where` 方法筛选 `Symbol` 包含 `query.Symbol` 的股票。

**作用**：根据 `query` 中的 `Symbol`，过滤出符合条件的股票。

### 4. `if (!string.IsNullOrWhiteSpace(query.SortBy))`

这里检查查询对象 `query` 中是否提供了排序依据。

- `query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase)`：检查 `query.SortBy` 是否等于 `"Symbol"`（忽略大小写）。
- `stocks = query.IsDecsending ? stocks.OrderByDescending(s => s.Symbol) : stocks.OrderBy(s => s.Symbol);`：根据 `query.IsDecsending` 来决定是按升序还是降序对 `Symbol` 进行排序。

**作用**：根据 `query` 中的 `SortBy` 和 `IsDecsending` 参数，决定股票数据的排序方式，主要针对 `Symbol` 属性进行排序。

### 5. `var skipNumber = (query.PageNumber - 1) * query.PageSize;`

这行代码负责处理分页逻辑。

- `(query.PageNumber - 1) * query.PageSize`：计算需要跳过的记录数。假设每页有 `PageSize` 条记录，当前是第 `PageNumber` 页，那么应跳过前 `(PageNumber - 1) * PageSize` 条记录。

**作用**：计算在分页查询时应跳过的记录数量。

### 6. `return await stocks.Skip(skipNumber).Take(query.PageSize).ToListAsync();`

- `stocks.Skip(skipNumber)`：从结果集中跳过前 `skipNumber` 条记录，开始从指定位置返回数据。
- `.Take(query.PageSize)`：从跳过后的数据中取出 `PageSize` 条记录，这决定了每次返回的数据条数。
- `.ToListAsync()`：执行查询并将结果转换为一个异步的 `List<Stock>`，返回给调用者。

**作用**：实现分页功能，从数据库中获取指定页的数据，并返回一个 `List<Stock>`。

### 总结

- **条件过滤**：根据传入的 `query` 中的 `CompanyName` 和 `Symbol` 进行筛选。
- **排序**：可以按照 `Symbol` 进行升序或降序排序。
- **分页**：跳过指定数量的记录，并只返回每页指定数量的数据。
- **异步操作**：整个查询是异步进行的，通过 `await` 来确保在异步操作完成后再返回结果。

这些操作结合起来，使得查询更加灵活，能够基于用户输入的过滤条件、排序方式和分页需求高效地从数据库中获取数据。
*/