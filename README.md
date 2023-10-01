# learn_NextJS
Next.js的基础 样式 路由和导航 Prisma构建数据库的API   上传文件 鉴权和认证 发送邮件 优化技巧 发布


## 什么是Next.js?
快速构建对搜索引擎友好的网络应用，基于react构建。Next.js有自己的路由库，不需要react-router
在同一个Next.js工程中，可以做全栈开发
SSR：Nodejs同时允许我们在服务端渲染组件，然后再将组件发给用户，应用更快，对搜索引擎更友好
Static Site Generation 静态站点生成器 
### 拓展插件使用
TypeScript ES7 Tailwind CSS
## 搭建第一个Next工程
src/directory 那里选No, import alias 选No.

### 项目结构
|
->app文件夹包含了路由系统 NextJS中的路由依赖于文件系统，通过创建文件和文件夹来表示路由。
快捷插件创建react结构->`rafce` app router : page.tsx
```bash
npx create-next-app@13.4
```

components文件夹无法公开访问，除非上面放page.tsx

!!服务端组件无法互动：无法处理浏览器事件。比如：点击，修改等
报错信息:
`
Unhandled Runtime Error
Error: Event handlers cannot be passed to Client Component props.
  <button onClick={function} children=...>
                  ^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
`
解决方法: 通知Nextjs的编译器，把这个文件打包到JavaScript的压缩包中
```tsx
use client
```

## 导航优化方法
场景：
1.顶部设置导航栏
2.左侧边栏
可以不重新下载重复的部分
用Nextjs的link组件
用<Link>组件替代<a></a>
CSR: 客户端渲染 
SSR：服务端渲染
客户端渲染和服务端渲染区别：
客户端渲染打包了所有的组件，全部发往客户端渲染，打包体积也会变大。对客户端要求内存增多;不能SEO;组件中包含了敏感的服务端信息或第三方库的信息，比如API key容易暴露给用户。
服务端渲染只需向客户端发送必要的内容，防止压缩包过于臃肿。渲染工作主要交给服务端来做，对客户端的资源需求小;更安全。

jsonplaceholder:提供JSON伪数据的API

typescript魔法；在构建阶段就能够发现类型冲突的问题
## 基本概念
## 客户和服务端组件
## 数据获取
在服务端获取数据的好处：
缓存，将数据放到能够更快访问的地方：
1.Memory 2.文件系统 3.网络 访问速度依次降低

fetch()第二个参数可以写成 { cache: 'no-store'} 来关闭缓存，对于数据频繁变化的场景是合适的，将永远向用户呈现最新的数据。
axios第三方库就不会对服务端进行缓存
## 静态和动态渲染
是一种性能优化技术
静态渲染（静态站点生成）：如果某些组件使用了静态的数据，在NextJS中渲染一次，在我们编译程序文件的时候。
下次需要这个组件时，Nextjs就不会渲染它们，会直接从负载或者缓存中读取内容。

开发环境下看不出来，但是生产环境下，静态资源是不变的。比如时间戳
```bash
Route (app)                              Size     First Load JS
┌ ○ /                                    7.44 kB        86.7 kB
├ ○ /_not-found                          878 B          80.1 kB
├ ○ /users                               141 B          79.4 kB
└ ○ /users/new                           141 B          79.4 kB

○  (Static)  automatically rendered as static HTML (uses no initial props) 圆圈就是静态资源，被自动渲染为静态HTML
```
时间戳并没有发生变化，因为是静态资源
```typescript
const res = await fetch('https://jsonplaceholder.typicode.com/users');
```
重新启动
```bash
Route (app)                              Size     First Load JS
┌ ○ /                                    7.44 kB        86.7 kB
├ ○ /_not-found                          878 B          80.1 kB
├ λ /users                               141 B          79.4 kB
└ ○ /users/new                           141 B          79.4 kB
+ First Load JS shared by all            79.2 kB
  ├ chunks/864-bad066d81d85625d.js       26.6 kB
  ├ chunks/fd9d1056-aa1b7ad4013ab4d6.js  50.8 kB
  ├ chunks/main-app-45b364dd17c3e20d.js  221 B
  └ chunks/webpack-7690162c4ca39ce3.js   1.64 kB


λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
时间戳发生了变化

## Tailwind CSS
### 边距
|  Paddings  |  Margins  |
|    ----    |   ----    |
|  p-[number]:设置内边距  | m-[number]:设置外边距   | 
|  px-[number]:水平内边距  |mx-[number]:水平外边距  |
|  py-[number]:垂直内边距  |my-[number]:垂直外边距  |
|  pt-[number]:顶部内边距  |mt-[number]:顶部外边距  |
|  pr-[number]:右侧内边距  |mr-[number]:右侧外边距  |
|  pb-[number]:下部内边距  |mb-[number]:下部外边距  |
|  pl-[number]:左侧内边距  |ml-[number]:左侧外边距  |

### 字体
|  Size  |  Color  |  Thickness  |
| ---- |  ----  |  ----  |
|  text-xs  |  text-[color]  |  font-thin  |
|  text-sm  |  bg-[color]  |  font-light  |
|  text-base  |    |  font-normal  |
|  text-lg  ||  font-medium  |
|  text-xl  ||  font-bold  |
|  text-2xl  ||
|  text-3xl  ||

优势：简洁，无需进行清理工作

#### daisyUI：Tailwind中流行的组件库
安装：
```bash
npm i -D daisyui@latest
```
导入：
```javascript
plugins: [require("daisyui")],
```
选择合适的主题：
```html
  // 第一步：
  daisyui: {
    themes: ["winter"],
  },
  // 第二步：HTML标签中使用主题
  > layout.tsx
  <html lang="en" data-theme="winter">

  // 第三步：修改为表格 users page.tsx
  <table className='table table-bordered'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>)}
    </tbody>
  </table> 
```