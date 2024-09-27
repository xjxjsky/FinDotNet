
这个项目的数据源来自于
---https://site.financialmodelingprep.com/
---https://www.sec.gov/
*************************************************************************************************
安装react环境：
npm intall create-react-app
安装React+TypeScript环境：
npx create-react-app frontend --template typescript

在根目录下启动React服务器：
npm start

TypeSrcript文件快速创建模板：
ES7+ React/Redux/React-Native/JS snippets 或者 ES7 React/Redux/GraphQL/React-Native snippets
-- traditional react = "rafce"
-- typescript react = "tsrafce"

Financial Modeling API

安装AXIOS：
npm install axios --save
npm install --sace-dev @types/axios

npm install dotenv --save

npm i --save-dev @types/uuid   //if you wanna install
********************************************************************************************************************************************************************************
`npm i --save-dev @types/uuid` 是一个用于安装 TypeScript 类型声明文件的命令。

具体来说，这个命令使用 npm（Node Package Manager）来安装 `@types/uuid` 包，并将其添加到 `devDependencies` 中。

**命令解释：**

- `npm`：Node Package Manager 的缩写，是 Node.js 的包管理工具。
- `i`：`install` 的缩写，用于安装包。
- `--save-dev`：选项，将安装的包添加到 `devDependencies` 列表中。这意味着该包只在开发环境中需要，不会在生产环境中使用。
- `@types/uuid`：要安装的包名。`@types` 作用域下的包通常是 TypeScript 的类型声明文件，用于为 JavaScript 库提供类型支持。`uuid` 是一个流行的生成唯一标识符（UUID）的库。

**作用：**

这个命令会在你的项目中安装 `@types/uuid`，以便 TypeScript 能正确识别和类型检查 `uuid` 库中的内容。这在开发过程中非常有用，因为它提供了类型安全和自动补全功能。

**安装后的 `package.json` 示例：**

```json
{
  "devDependencies": {
    "@types/uuid": "^8.3.4"
  }
}
```

这样，项目在开发过程中就能使用 `uuid` 库的类型声明，从而获得更好的开发体验和更少的类型错误。
******************************************************************************************************************************************************************************

Create separate API file


安装Tailwindcss:
1. npm install -D tailwindcss
2. npx tailwindcss init

******************************************************************************************************************************************************************************
安装Router
1. 
npm install -save react-router
npm install react-router-dom

2. 
npm install --save@types/react-router-dom
npm install --save@types/react-router

以下为这4条命令的解释说明：
###########################################################################
这些命令用于安装 React Router 及其类型定义。让我们逐一解释每个命令的用途：

1. 
```sh
npm install --save react-router
npm install react-router-dom
```
- `npm install --save react-router`：这个命令会安装 `react-router` 包，它是一个库，用于处理 React 应用中的路由逻辑。
- `npm install react-router-dom`：这个命令会安装 `react-router-dom` 包，它是 `react-router` 的一个具体实现，用于 Web 浏览器环境。

2. 
```sh
npm install --save @types/react-router-dom
npm install --save @types/react-router
```
- `npm install --save @types/react-router-dom`：这个命令会安装 `@types/react-router-dom` 包，它包含 `react-router-dom` 的类型定义文件，用于 TypeScript 项目。
- `npm install --save @types/react-router`：这个命令会安装 `@types/react-router` 包，它包含 `react-router` 的类型定义文件，用于 TypeScript 项目。

总结一下：
- 前两条命令用于安装 React Router 及其 DOM 实现，适用于 JavaScript 项目。
- 后两条命令用于安装 React Router 及其 DOM 实现的类型定义，适用于 TypeScript 项目。

这些包的安装可以帮助你在 React 项目中实现路由功能，并且在 TypeScript 项目中提供类型支持，提升代码的可靠性和开发体验。
要实现基本的路由功能，并不是所有这4条命令都必须执行，具体要看你是否使用 TypeScript 进行开发：

### 如果使用 JavaScript：

必须要安装的命令：
```sh
npm install react-router
npm install react-router-dom
```

这两条命令安装了基本的 `react-router` 和 `react-router-dom`，这是实现路由功能所必须的。

### 如果使用 TypeScript：

必须要安装的命令：
```sh
npm install react-router
npm install react-router-dom
npm install @types/react-router
npm install @types/react-router-dom
```

这四条命令不仅安装了基本的 `react-router` 和 `react-router-dom`，还安装了它们的类型定义包 `@types/react-router` 和 `@types/react-router-dom`，这对于 TypeScript 项目是必须的，以确保你在使用这些库时有完整的类型支持。

总结：

- JavaScript 项目只需要前两条命令。
- TypeScript 项目需要全部四条命令。
#####################################################################################################################

*****************************************************************************************************************************************************************************
sudo 是一个 Unix 和 Linux 命令，代表“superuser do”。它允许具有适当权限的用户以超级用户（root）的身份运行命令。这在某些情况下是必要的，比如当你需要修改系统文件或在某些端口（如80或443）上运行服务器时。 
sudo npm start  运行这个命令后，npm 会以超级用户权限启动 Node.js 应用程序，并在端口80上监听请求。

*****************************************************************************************************************************************************************************
Emmet abbreviation（Emmet缩写）是一个用于快速编写HTML和CSS代码的工具。Emmet通过使用缩写语法，可以极大地提高前端开发的效率。你可以通过简单的缩写，生成复杂的HTML结构和CSS样式。

*******************************************************************************************************
React-icons 可以找到網站需要的各種圖標
https://react-icons.github.io/react-icons/

npm install react-icons
or yarn add react-icons
********************************************************************************************************
安装 spinner
npm i react-spinners








$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
这个前端 React 项目结构可以分为以下几个主要部分：

1. **根目录文件**:
   - `App.tsx`: React 应用的主入口组件，通常是整个应用的核心部分，管理路由和主要布局。
   - `index.tsx`: 应用的启动文件，将 `App` 渲染到 HTML 页面上。
   - `App.css` 和 `index.css`: 全局样式文件，用于定义整个应用的基础样式。

2. **`Components` 文件夹**:
   - 存放各种独立的 React 组件，例如 Sidebar、Spinner 等。每个组件通常代表页面中的某个功能模块，负责渲染特定的内容或交互逻辑。
   
3. **`Pages` 文件夹**:
   - 包含页面级组件，这些组件一般与路由直接相关，如 `RealAlarmPage` 等。每个页面组件通常负责一个完整的视图，如仪表盘、详情页等。
   
4. **`Services` 文件夹**:
   - 存放与后端 API 交互的服务文件。比如 `realAlarmDataGetAPI` 可能是用于从后端获取报警数据的函数。这一层主要负责应用与外部数据源的通信。

5. **`Context` 文件夹**:
   - 这里可能包含 React 的 Context，用于管理全局的状态，如用户信息或主题设置等。Context 提供了一种在组件树中共享数据的方式，避免了多层嵌套传参的复杂性。

6. **`Models` 文件夹**:
   - 该文件夹可能包含与数据模型相关的类型定义或接口，用来表示前端如何理解后端返回的数据结构。`AlarmProfile` 这样的接口可能定义了报警的具体字段。

7. **`Routes` 文件夹**:
   - 应该存放路由配置，负责定义不同路径对应的组件。通过 `react-router-dom`，可以将不同的页面和 URL 路径关联起来。

8. **`Helpers` 文件夹**:
   - 辅助函数库，通常包含一些与业务无关但常用的工具函数，便于在多个组件中复用。

9. **`CSS` 文件夹**:
   - 这里的样式可能是为某些特定组件服务的局部样式，或者是第三方库的样式文件。

10. **`common.d.ts` 和 `company.d.ts`**:
    - 这些文件定义了一些全局的类型和接口，用来为 TypeScript 提供类型支持。可能包含了公司、报警等业务相关的接口定义，确保组件在使用数据时能享受类型检查的好处。

### 各个组件的相互关系：
- **App.tsx**: 作为应用的根组件，它通常会包含路由系统，决定显示哪个页面组件。
- **Pages**: 每个页面组件都会被路由指向，页面内部则会使用 `Components` 文件夹下的各种子组件来渲染不同部分的内容。
- **Services**: 页面组件会调用 `Services` 中定义的 API 服务，获取数据并将其传递给子组件。
- **Context**: 在顶层组件（比如 `App.tsx`）中可以通过 `Context` 来提供全局状态，供页面和子组件使用。
- **Models**: 这些接口和类型定义确保在 `Services` 中获取的数据和 `Pages` 中使用的数据结构都是一致的，有助于在编写组件时避免类型错误。

这项目采用了分层结构，合理地将各个功能模块拆分为不同的部分，方便开发、测试和维护。

理解这些组件之间的相互关系可以帮助我们理清整个项目的功能模块。我们逐步分析 `SearchPage`、`Search`、`ListPortfolio`、`CardList`、`CardPortfolio`、`Card`、`AddPortfolio` 和 `DeletePortfolio` 组件之间的关系。

### 组件层级关系与作用：

1. **SearchPage**（页面组件）
   - `SearchPage` 可能是一个页面级组件，它负责整体布局和调用其他组件，比如 `Search`、`ListPortfolio` 等。
   - 它可能作为一个视图，用来展示投资组合的搜索、添加和删除等功能。
   - **主要作用**：渲染页面上的搜索功能和投资组合列表。

2. **Search**（子组件）
   - `Search` 是 `SearchPage` 内部的一个组件，用于实现用户搜索功能，通常包括一个输入框和搜索按钮。
   - 用户在 `Search` 组件中输入关键字时，触发搜索操作，这可能会通过回调函数将输入数据传回给 `SearchPage`，然后通过 `SearchPage` 向下传递数据给 `ListPortfolio` 组件。

   **关系**：`Search` 是 `SearchPage` 的子组件，用于输入搜索条件。

3. **ListPortfolio**（子组件）
   - `ListPortfolio` 是一个显示投资组合列表的组件，可能会接收来自 `SearchPage` 或 API 的投资组合数据，然后将这些数据展示出来。
   - 它内部通常会调用 `CardList` 组件来展示每个投资组合的卡片。

   **关系**：`ListPortfolio` 是 `SearchPage` 的子组件，负责展示投资组合数据。

4. **CardList**（子组件）
   - `CardList` 是一个容器组件，用来将多个投资组合以卡片形式展示出来，内部可能会渲染 `CardPortfolio` 组件或直接渲染 `Card` 组件。
   - 这个组件的作用是遍历 `ListPortfolio` 传递的数据，并为每个投资组合生成一个卡片。

   **关系**：`CardList` 是 `ListPortfolio` 的子组件，主要负责将投资组合列表渲染成卡片形式。

5. **CardPortfolio**（子组件）
   - `CardPortfolio` 是每个投资组合的具体表示，它可能包含投资组合的详细信息，比如名称、收益率等。
   - 这个组件与 `CardList` 配合，负责展示具体的投资组合。

   **关系**：`CardPortfolio` 是 `CardList` 的子组件，负责展示单个投资组合。

6. **Card**（基础组件）
   - `Card` 是更基础的 UI 组件，它可能是一个通用的卡片组件，用来显示各种不同类型的数据，不仅仅局限于投资组合。
   - 它可以被多个父组件复用，比如 `CardPortfolio` 可能会使用 `Card` 来统一样式和布局。

   **关系**：`CardPortfolio` 或 `CardList` 可能会使用 `Card` 作为通用的卡片布局。

7. **AddPortfolio**（子组件）
   - `AddPortfolio` 是一个功能组件，允许用户添加新的投资组合。它可能会展示一个表单，用户输入信息后提交。
   - 提交的数据通常会传递到 `SearchPage` 或某个父组件，父组件再通过 API 更新后台数据并刷新页面。

   **关系**：`AddPortfolio` 可能在 `SearchPage` 中作为一个子组件存在，用于添加新投资组合。

8. **DeletePortfolio**（子组件）
   - `DeletePortfolio` 是一个功能组件，用于删除某个投资组合，通常会伴随一个删除按钮。
   - 点击删除按钮后，`DeletePortfolio` 会触发某个回调函数，调用 API 删除数据，之后更新页面。

   **关系**：`DeletePortfolio` 可能与 `CardPortfolio` 或 `ListPortfolio` 组件配合，用于删除具体的投资组合。

### 组件相互关系总结：

- **`SearchPage`** 是主页面组件，它包含了其他所有功能性组件，如 `Search`、`ListPortfolio`、`AddPortfolio` 和 `DeletePortfolio`。
- **`Search`** 组件是一个用于输入搜索条件的组件，它将用户输入的数据传递给 `SearchPage`，从而影响 `ListPortfolio` 的显示。
- **`ListPortfolio`** 是用于显示投资组合的组件，它接收搜索结果或完整的投资组合数据，然后通过 **`CardList`** 渲染出多个 **`CardPortfolio`**。
- **`CardPortfolio`** 是每个投资组合的展示组件，可能会显示详细信息，并提供编辑或删除功能。
- **`AddPortfolio`** 组件允许用户添加新投资组合，它的作用是触发新增操作并刷新列表。
- **`DeletePortfolio`** 组件负责删除某个投资组合。

这些组件共同协作，完成一个投资组合管理页面的功能，`SearchPage` 是最顶层的组件，管理着页面的整体布局和功能调度，而其他组件则分工明确，各自完成其特定的功能。
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

要详细介绍整个项目中所有组件和页面的功能以及它们之间的关系，我们可以逐步分析每个组件和页面在项目中的作用和职责，并介绍它们如何协作来完成整个系统的功能。我将尽量通俗易懂地解释它们的功能与相互关系。

### 1. **`SearchPage` 页面**
   - **功能**：这是一个页面组件，主要用于展示投资组合的搜索功能和搜索结果列表。它是这个模块的主页面，包含搜索框、投资组合列表、以及增删投资组合的功能。
   - **相互关系**：`SearchPage` 是顶层组件，内部嵌套了 `Search`、`ListPortfolio`、`AddPortfolio` 等功能组件，通过调用这些组件来完成不同的功能。

### 2. **`Search` 组件**
   - **功能**：这是一个用于输入搜索条件的组件，通常包含一个输入框和搜索按钮。当用户在这个组件中输入关键字时，它会将用户的输入提交给 `SearchPage`，触发搜索操作。
   - **相互关系**：`Search` 是 `SearchPage` 的子组件，负责接受用户输入并将搜索条件传递给 `SearchPage` 以便更新显示的投资组合。

### 3. **`ListPortfolio` 组件**
   - **功能**：`ListPortfolio` 负责展示一个或多个投资组合的列表。当用户在搜索框中输入关键字后，`ListPortfolio` 会根据搜索结果展示匹配的投资组合。它不直接显示投资组合的详细信息，而是通过调用 `CardList` 和 `CardPortfolio` 来处理。
   - **相互关系**：`ListPortfolio` 是 `SearchPage` 的子组件，用于接收从 `SearchPage` 传递来的投资组合数据，并将其渲染为一个列表。

### 4. **`CardList` 组件**
   - **功能**：这是一个用于组织和显示投资组合卡片的容器组件。它从 `ListPortfolio` 处接收投资组合数据，并将每个投资组合以卡片的形式展示出来。它不直接渲染投资组合的具体内容，而是调用 `CardPortfolio` 组件来渲染每个投资组合。
   - **相互关系**：`CardList` 是 `ListPortfolio` 的子组件，它负责管理整个投资组合列表的卡片布局，最终呈现多个 `CardPortfolio`。

### 5. **`CardPortfolio` 组件**
   - **功能**：这是一个用于显示单个投资组合详细信息的组件，通常包括投资组合的名称、收益率、状态等数据。用户可以在这里看到每个投资组合的基本信息。它还可能包含一些功能按钮，比如编辑、删除等。
   - **相互关系**：`CardPortfolio` 是 `CardList` 的子组件，它具体展示每个投资组合的详细信息，是 `ListPortfolio` 中数据展示的核心组件。

### 6. **`Card` 组件**
   - **功能**：`Card` 是一个基础的 UI 组件，通常是一个通用的卡片样式。它可能不包含具体的逻辑，而是提供一个通用的布局和样式，用于显示各类信息，比如投资组合数据。多个组件可能会复用 `Card` 来统一样式。
   - **相互关系**：`Card` 可能被 `CardPortfolio` 或其他组件使用，作为内容展示的基础框架。

### 7. **`AddPortfolio` 组件**
   - **功能**：这个组件用于添加新的投资组合。它通常会包含一个表单，用户可以在表单中输入新的投资组合信息（如名称、描述等），并通过提交表单将这些数据传递给后台。提交后，页面会刷新并更新显示的投资组合。
   - **相互关系**：`AddPortfolio` 组件通常在 `SearchPage` 中被使用，作为一个功能性组件，用于向现有的投资组合列表中添加新的项目。

### 8. **`DeletePortfolio` 组件**
   - **功能**：这个组件的作用是删除现有的投资组合。它通常会包含一个删除按钮，用户点击按钮后会触发删除操作，并将指定的投资组合从数据库中删除。
   - **相互关系**：`DeletePortfolio` 组件可能在 `CardPortfolio` 或 `ListPortfolio` 中被使用，用于删除单个投资组合的功能。

### 9. **`RealAlarmPage` 页面**
   - **功能**：`RealAlarmPage` 是一个页面级别的组件，专门用于展示实时报警信息。它可能包括一个侧边栏（`Sidebar`）来导航到不同的报警相关功能页面，并且会显示一个报警仪表板（`RealAlarmDashBoard`），其中会展示来自后台的数据。
   - **相互关系**：`RealAlarmPage` 内部调用了 `Sidebar` 组件和 `RealAlarmDashBoard` 组件来构建报警功能页面。

### 10. **`RealAlarmDashBoard` 组件**
   - **功能**：这是一个仪表板组件，用于展示报警数据的核心区域。它接收来自 `RealAlarmPage` 的报警信息并进行展示。可以通过 `message` 属性接收父组件传递的报警状态或其他信息。
   - **相互关系**：`RealAlarmDashBoard` 是 `RealAlarmPage` 的子组件，负责展示报警数据的详细信息。

### 11. **`Sidebar` 组件**
   - **功能**：`Sidebar` 是一个侧边栏导航组件，它提供一些导航链接，用户可以通过这些链接切换到不同的功能页面。它通常会被页面组件使用，来实现页面的导航功能。
   - **相互关系**：`Sidebar` 组件在 `RealAlarmPage` 等页面中使用，用于提供导航功能。

### 12. **`Spinner` 组件**
   - **功能**：`Spinner` 是一个简单的加载动画组件，通常用于异步数据加载时展示一个“加载中”的状态，直到数据加载完成。
   - **相互关系**：`Spinner` 可以在任何异步数据加载时使用，通常在 `RealAlarmPage`、`ListPortfolio` 等组件中用来展示加载状态。

---

### 整体结构和组件关系总结：

- **页面级组件**：`SearchPage` 和 `RealAlarmPage` 是两个顶层页面组件，分别用于展示投资组合管理功能和报警信息管理功能。
- **子组件**：
  - **搜索功能**：`Search` 负责处理用户输入的搜索条件。
  - **数据展示**：`ListPortfolio` 显示搜索结果，内部调用 `CardList` 来管理多个 `CardPortfolio`，每个 `CardPortfolio` 通过 `Card` 来显示单个投资组合。
  - **功能操作**：`AddPortfolio` 用于添加新投资组合，`DeletePortfolio` 用于删除投资组合。
  - **报警信息展示**：`RealAlarmDashBoard` 负责展示报警的详细信息。
  - **加载和导航**：`Spinner` 负责展示加载状态，`Sidebar` 负责页面之间的导航。

项目中，各个组件之间的关系非常清晰，页面组件作为顶层容器，通过组合多个子组件来完成具体功能。

###################################################################################################################################################