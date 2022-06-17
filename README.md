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

In the JSphere CLI enter the following: 
create project Mindful --init 

You should now see a folder named Mindful in your JSphereProjects folder and your JSphere CLI should now display a JSPHERE:Mindful> prompt. 

 

Start JSphere Server 

In the JSphere CLI enter the following: 
run 

The JSphere server should start and you should see the message JSphere Application Server is running. 

Open a browser and enter into your navigation bar the following: 
http://localhost/app/client/index.html 

You should see displayed in your browser the message Hello JSphere. 

Once the JSphere server is running you will no longer have access to the JSphere CLI.  You will have to open another instance of your computer’s CLI and start the JSphere CLI tool again. 
