# Mindful Hackathon
Documentation for the Mindful Hackathon

## Environment Setup 

### Install the Deno runtime on your computer 

- Visit https://deno.land/ and follow the instructions for your computer’s operating system. 

- In your computer’s CLI enter the following:
  ```
  deno --version
  ```


### Install/Update Git on your computer 

- Visit https://git-scm.com/book/en/v2/Getting-Started-Installing-Git and follow the instructions for your computer’s operating system. 

 
### Install Docker if you would like to run JSphere within a container (Optional/Advance) 

- Visit https://docs.docker.com/get-docker/ and follow the instructions for your computer’s operating system. 

 
### Install the JSphere CLI tool 

- In your computer’s CLI enter the following: 
  ```
  deno install -n=jsphere --allow-all --reload --no-check https://deno.land/x/jsphere/cli.js
  ```

## Project Setup 

### Create a project 

- Create a folder named `JSphereProjects` on your computer. 

- Using your computer’s CLI tool navigate to the `JSphereProjects` folder. 

- In your computer’s CLI enter the following: 
```
jsphere 
```

- This will start the JSphere CLI tool and you should see a `JSPHERE>` prompt. 

- In the JSphere CLI enter the following: 
```
create project Mindful --init 
```

- You should now see a folder named `Mindful` in your `JSphereProjects` folder and your JSphere CLI should now display a `JSPHERE:Mindful>` prompt. 

 
### Start JSphere Server 

- In the JSphere CLI enter the following: 
```
run
```

- The JSphere server should start and you should see the message `JSphere Application Server` is running. 

- Open a browser and enter into your navigation bar the following: 
```
http://localhost/app/client/index.html
```

- You should see displayed in your browser the message `Hello JSphere`. 

- **Once the JSphere server is running you will no longer have access to the JSphere CLI.  You will have to open another instance of your computer’s CLI and start the JSphere CLI tool again.** 


## JSphere Basics 

### What is a project? 

- A project is a collection of configuration files and application artefacts that define the hosting environment for applications running in a JSphere instance. 

- A project consists of two or more folders(repositories). 

- A folder named `.jsphere` which contains the projects configuration information. 

- One or more folders (e.g., `app`), referred to as packages, which contain all of the application’s artefacts. 

- Each project package contains two subfolders, one named `client` and the other named `server`. 

- For the Hackathon you will only need to use the server folder. 

 
### How do I create an API endpoint? 

- If you look in your `app` package (folder), in the `server` subfolder, you will see a file named `index.ts`.  Inside the file `index.ts` you will see an example of a function that defines an API endpoint.

```
export async function message(ctx: any) : Promise<any> {
    return ctx.response.text('Hello JSphere');
}
message.attributes = { method: 'GET' };
```

- You can copy the code and paste it below it's self. 

- Modify the copied code to look like the following:
 
```
export async function appversion(ctx: any) : Promise<any> { 
    return ctx.response.json({ major: 0, minor: 0, patch: 6 }); 
} 
appversion.attributes = { method: 'GET' };
```

- Using your browser enter into the navigation bar the following: 
```
http://localhost/app/server/index/appversion
```

- You should see displayed in your browser the following:
```
{ major: 0, minor: 0, patch: 6 }
```

- Please note that any valid HTTP method (e.g., `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, etc.) can be specified in the line:
```
appversion.attributes = { method: 'GET' };
```

### How do I access data passed to an API endpoint? 

- Let's say we had the following HTTP request arrive at our application's API endpoint:<br/>
Request URL: `http://localhost/app/server/user/add?foo=bar`<br/>
Request Method: `POST`<br/>
Request Body:<br/>
```
{
    "email": "adam@eden.com",
    "fname": "adam",
    "lname": ""
}
```
- Then our API endpoint should be coded in a file named `user.ts` in the `server` folder as follows:
```
export async function add(ctx: any) : Promise<any> {
    const foo = ctx.request.params.foo;
    const email = ctx.request.data.email;
    const fname = ctx.request.data.fname;
    const lname = ctx.request.data.lname;
    return ctx.response.json({ foo, email, fname, lname }); 
} 
add.attributes = { method: 'POST' };
```

### How do I debug my API endpoint? 

- Using the previous example you would debug your API endpoint by updating your code as follows:
```
export async function add(ctx: any) : Promise<any> {
    debugger;
    const foo = ctx.request.params.foo;
    const email = ctx.request.data.email;
    const fname = ctx.request.data.fname;
    const lname = ctx.request.data.lname;
    return ctx.response.json({ foo, email, fname, lname }); 
} 
add.attributes = { method: 'POST' };
```

- Next open your browser (these instructions are for the Chrome browser) and enter into the navigation bar:
```
chrome://inspect
```
- You may need to wait a few seconds for chrome to display that your `Remote Target #LOCALHOST` server is available for inspection.
- Click on `inspect` to open Chrome's debugging console.
- Submit a request to your API endpoint and you should be now able to see your code in the Chrome debugging and execution paused at the line:
```debugger;```
