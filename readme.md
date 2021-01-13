This glossary will be a quick guide for all technical terms inside our platform
      
### Project
A project is where you have all the orchestration needed to connect Applications. 
This will be the final package ready for distribution.
      
### Application
We call a Universal Application every third-company endpoint that is ready to connect with LinkApi. 
They contain all the resources to be consumed via coding. For example, if you want to connect with MailChimp and send an email, 
you can use our already crafted Universal Application.
You can also build your own integrations with your own credentials. Hands on the code!

### Function
Functions are a static piece of code that can be reused any number of times in your integrations. 
They will expect an input and a return output based on the data sent. All functions will be under your personal Catalog.

### Data-Transformation
Data-transformations are responsible for converting a Payload returned from a Resource and make it understandable 
to another Resource to connect with.

### Automation
An Automation is a complete integration flow. The automation orchestrates all the resources, functions,
data-transformation on your catalog and the SDK to make all the requests and logical rules needed.

### Trigger
The Triggers are responsible to make you Automation run. Just choose an Automation, the payload that will be
used, and how often you want it to run.