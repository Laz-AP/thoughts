---
layout: post
title: "Chicago Innovate 2026 – Workshops"
author: "Laszlo Andrasi"
categories: Posts
tags: [posts]
image: Chicago-Innovate-2026/IMG_0826.jpg
---

## Hands-On at Chicago Innovate 2026: A Recap of Workshops

Chicago Innovate is back for its fifth year. The organizers describe it as a week that "connects the AECO industry with the startups, hardtech, and capital driving its future." The 2026 edition began on Thursday, September 24, with a day of hands-on masterclasses at 25 East Washington. We met on the seventh floor, in a shared office space organized around a bright atrium. It was a great place to spend a day building, testing, and talking shop. Thank you to our hosts for having us.

The day offered five workshops across a wide range of topics, from rethinking how we build algorithms to turning a new city policy into practical Revit workflows:

- Blank Canvas: Grasshopper 2 from the Ground Up, taught by McNeel
- Orkestra Agentic Playground, taught by Orkestra
- Automating Grasshopper Plugin Development with AI, taught by CORE studio at Thornton Tomasetti
- RunDiffusion, an afternoon session
- Digital Strategies for Addressing the 2024 City of Chicago Sustainable Development Policy, taught by Perkins&Will

<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:8px;">
<img src="https://laz-ap.github.io/thoughts/assets/img/Chicago-Innovate-2026/IMG_0826.jpg" style="width:100%; height:auto;">
<img src="https://laz-ap.github.io/thoughts/assets/img/Chicago-Innovate-2026/IMG_4353.jpeg" style="width:100%; height:auto;">
</div>

# The Workshops

## Blank Canvas: Grasshopper 2 from the Ground Up *(McNeel)*

*Written by Chaz McRhea*

This full-day session introduced Grasshopper 2 (GH2), which runs in the Rhino beta. McNeel stressed that GH2 is not an incremental update. It is a full rewrite, with new data structures, a new component library, and a different underlying approach to building algorithms. No prior Grasshopper experience was required.

Throughout the workshop, we worked through a series of demonstration scripts to explore how GH2's new tools and data structures could change familiar Grasshopper workflows. The first example was incredibly simple but immediately demonstrated how fundamentally GH2 has been reworked. We created a series of cubes stacked on top of each other, assigned each ascending layer a level through metadata, and then used those levels to apply a gradient of colors to the cubes. The final result was simple, but achieving the same thing in Grasshopper 1 would require a much more complicated series of operations to pull information from individual objects, organize it through data trees, correlate it to a color, and then apply it back to the correct objects. In GH2, the same workflow could be accomplished with just a few components in a matter of minutes. This was one of the first moments when GH2 felt much more intuitive to me than GH1. The new Panel component reinforced that feeling by allowing information to be edited and reordered directly, rather than requiring additional components to manipulate the data.

Another feature I found particularly fun was the new ability to interact directly with Grasshopper-generated geometry in the Rhino viewport. In GH1, geometry can be previewed in Rhino, but it is essentially a ghosted representation until it is baked, at which point it is no longer connected to the Grasshopper definition. In GH2, generated objects can be selected and manipulated directly in Rhino, with those changes feeding back into the Grasshopper definition. For example, a point generated in GH2 can be dragged to a new location in Rhino, and the underlying data updates automatically without requiring additional components to define its exact position. It felt like a small but meaningful change to the relationship between Grasshopper and Rhino and made the process of working with generated geometry feel much more immediate and interactive.

The metadata system was ultimately the biggest takeaway for me, particularly from an architectural perspective. GH2 objects can carry information with them throughout a definition, allowing the script to access specific information as needed without constantly separating, reorganizing, and reconnecting data. The example of a door was especially compelling: information about the door, its hardware, materials, and other associated components can travel with the object and be accessed when needed. This reminded me of the way Revit families can contain a significant amount of technical information about an element and its individual parts. GH2 is still in its early stages, and the workshop leader noted that it could take a few years to reach the same level of plugin compatibility as GH1. While GH2 is not yet ready to fully replace GH1, the workshop left me excited about its potential to simplify complex workflows and open up entirely new ways of working with Grasshopper.

## Orkestra Agentic Playground *(Orkestra)*

*Written by Shilpa Pandey*

### Orkestra + OkPy Agent: Agentic AI for AEC

Orkestra is an AEC-focused automation and deployment platform designed to help architecture, engineering, and construction teams build, manage, distribute, and maintain computational tools across a firm. At the center of the workshop was OkPy Agent, Orkestra's agentic AI environment for creating automation tools directly inside AEC software. Instead of requiring designers to understand Python, C#, APIs, or traditional plug-in development, a user can describe a workflow in natural language and allow the agent to develop the tool, create its interface, test it, and refine it through conversation.

A major distinction discussed during the workshop was the difference between a general AI model, an MCP connection, and an agentic "harness." MCP, or Model Context Protocol, essentially gives an AI access to a standardized set of external tools, while a harness adds much more context around how the agent should work. OkPy's harness is specifically designed around AEC applications: it understands the software environment, relevant APIs, versions, common workflows, UI conventions, testing procedures, and available toolkits. This allows the user to focus primarily on defining what they want the tool to accomplish, rather than explaining every technical detail of Revit or another application's API.

### About OkPy Tools: From Idea to a Working AEC Tool

Several live examples demonstrated how quickly relatively sophisticated tools could be created. At Autodesk University, the Orkestra team reportedly created around 40 tools in three days through this agentic workflow. One example generated vehicle turning-radius diagrams for different vehicle types and conditions in roughly 15 minutes. Another tool accessed Autodesk Construction Cloud projects and allowed users to browse project issues, screenshots, status information, and properties—a workflow the presenter estimated could otherwise take days to develop manually.

The workshop's live exercise created a façade documentation tool in Revit. Starting with a simple request to select a scope box around a façade, OkPy developed a tool that identified relevant model information, generated plans, elevations, sections, and a 3D view, created sheets, and placed the resulting views onto those sheets. The first functional version was produced in approximately 11 minutes and 40 seconds, after which the user could continue refining the interface and functionality conversationally.

### Existing Tools and the OkPy Tool Library

Users do not necessarily need to build every tool themselves. Orkestra provides a curated library of ready-to-use OkPy tools that can be browsed from the platform and added directly to the user's toolset. The workshop demonstrated tools such as a Linked/Imported DWG Detector, a tool for adding parameters across multiple Revit families, a city/model generator using OpenStreetMap data, and a shadow-study tool with its own interactive visualization. Revit currently has a larger collection, while tools for platforms such as Rhino are also available.

### Cloud Deployment: An Advantage for Firmwide Workflows

One of Orkestra's strongest features is what happens after a tool has been created. Orkestra acts as the deployment and management layer for automation across the organization. Tools can be uploaded to cloud-based workspaces, with administrators controlling which employees or teams can access each workspace. An administrator can open, inspect, and modify tools, while regular users can simply run the tools assigned to them.

Tools can then be deployed directly into customized Revit, Rhino, AutoCAD, or Civil 3D ribbons. The platform also supports documentation, versioning, analytics, and troubleshooting. Documentation can be generated for a newly developed tool, including its purpose, inputs, outputs, instructions, screenshots, tips, and limitations. Firms can monitor how tools are used and collect execution logs. If a deployed tool fails for a user, the workshop demonstrated a "Fix it with Agent" workflow in which OkPy can receive the failed-run information, software/version context, and error logs, identify the relevant code problem, and help produce an updated deployment.

### An Important Difference: AI Builds the Tool, but Does Not Need to Run It

One of the most interesting ideas from the workshop was the separation between AI-assisted creation and deterministic execution. OkPy Agent uses AI while developing and modifying the tool, but once the tool has been created, the resulting automation can run as normal code rather than asking an AI model what to do every time it is launched.

OkPy also includes a controlled Test Mode. During development, the agent can inspect the model without freely modifying it. When the user decides to test the automation, changes can be executed within a Revit transaction and rolled back after the test. The agent simultaneously captures events and errors so it can determine whether the workflow performed as expected. This keeps a human validation step in the loop before the automation is deployed more widely.

### Subscription and Cost: A Possible Disadvantage

The workshop described a practical licensing strategy for firms: provide the basic Orkestra platform to the broader team so employees can access and run centrally managed tools, while purchasing OkPy Agent licenses mainly for BIM, computational-design, or other power users who create and maintain tools.

During the workshop, each tool I created required at least two to four rounds of refinement before it worked reliably in Revit and created the intended elements. That iteration could become a bottleneck for modeling teams and could also create unexpected usage or subscription costs if the account is not on a Pro plan.

Another potential disadvantage is managing the tools that designers create, including the possibility of duplicate tools for the same tasks as the Orkestra ecosystem becomes distributed firmwide.

### Overall Takeaway

The workshop positioned Orkestra not simply as another AI assistant, but as an AEC automation ecosystem:

**Idea → AI-assisted tool creation → Testing → Documentation → Cloud deployment → Firmwide ribbon → Usage analytics → Error feedback → Agent-assisted improvement**

Its larger value is therefore not just that AI can write code faster. It lowers the barrier for architects and designers to turn practical workflow ideas into usable automation.

### Recommendation: Yes

I would recommend it to computational or project teams, with access initially limited to a few members of the team. Orkestra also gives BIM and technology teams a controlled way to distribute, maintain, and govern tools across an organization. The result could shift computational design from something created primarily by specialist programmers into a much more accessible firmwide capability—where designers identify the problem and define the workflow, while the agent handles much of the technical implementation.

## Deep Dive: Digital Strategies for Addressing the 2024 City of Chicago Sustainable Development Policy

**Led by Laszlo Andrasi and Carl Giometti, Perkins&Will**

Our morning masterclass had a strong turnout, and nearly everyone who registered attended. We set out to turn Chicago's 2024 Sustainable Development Policy into workflows teams can actually use, moving from strategy to policy to hands-on modeling. The session had four parts.

### Part 1: Building a Digital Strategy

After a brief introduction to ourselves and Perkins&Will, we started with a simple premise: your digital strategy should be planned from day one and revisited at every milestone.

A digital strategy is really about how you deliver your design. Bringing digital practice in early means you build robust workflows from the start instead of troubleshooting at the end. Every project goes through strategic decision points that produce a plan, and every project eventually drifts from that plan, sometimes for the better and sometimes not. Checking in regularly keeps the team aligned with where it needs to go.

We walked attendees through a digital roadmap that starts at the end and works backward:

1. **Define the output.** What outcome is desired? Who is setting the requirement? Is there a prescribed value to meet? Is there a required format?
2. **Idealize the workflow.** Once the output is clear, what tools can support the ideal workflow, and how sophisticated do they need to be?
3. **Assess the project team.** Who is assigned? Do they have the skills? If not, do they have time to train, do they need more support, or is there a different way to do the task?
4. **Execute with buy-in.** Does the team support the approach? Ideally, the team builds the workflow itself. People who build a workflow own it, understand it better, and are better able to respond when problems come up.

### Part 2: A Policy Primer

Next, we covered the policy itself: its background, basic use, and a decision tree for applying it:

- When does the policy apply, and to which project categories?
- How many points are required, and are any items mandatory?
- What are the compliance pathways? Teams can select items from the menu, or pursue third-party certification plus additional menu items.
- What are the next steps?

We then went deeper into two categories.

**Bird Protection has two levels:**

- Basic: Protect high-risk features and high-risk façade areas, from grade to 75 feet. This also covers façades next to vegetated roofs or amenity decks and requires exterior lighting best practices.
- Enhanced: Everything in Basic, plus protection for medium-risk façades above 75 feet.

**Energy offers points for:**

- Exceeding the Chicago Energy Transformation Code by 5% or 10%
- Rooftop solar-ready construction
- On-site renewable energy, worth 10–30 points
- Building electrification, worth 30 points
- A maximum 40% glass façade, which was a focus of our hands-on exercise
- Meeting ComEd new-construction best practices

We also reviewed which menu items are available under Compliance Pathway 1 and Pathway 2.

### Part 3: Bird-Friendly Design

Carl then gave a deep dive into bird-friendly design. He covered the history of Chicago's bird-friendly requirements and noted that similar policies are becoming enforceable ordinances in cities such as New York, Toronto, and Vancouver.

He explained the science behind the 2-inch by 4-inch rule for critical pattern spacing. Birds, like people, cannot actually see glass. Humans are simply good at reading the cues around it, such as mullions and frames. Some takeaways:

- Birds in urban areas seem to be better at navigating glass than birds elsewhere.
- The greatest risk comes from glass that shows or reflects nature, such as vegetated roofs, trees, or sky.
- Fly-through conditions are also very dangerous.
- Research suggests reflection is more dangerous than transparency. For that reason, UV-pattern glass is now less recommended, and visible treatments such as etching are preferred.

### Part 4: Hands-On Revit Workflow

We closed with a hands-on Revit session using a sample project. Attendees learned to model more efficiently by:

- Creating dedicated curtain wall systems whose vertical and horizontal grid parameters are driven by the structural grid and level-to-level dimensions.
- Building a unitized panel approach with parameters for panel composition, height, and material.
- Adding reporting parameters that calculate vision-glass area automatically, making the window-to-wall ratio easy to track against the policy's 40% glass threshold.

The session went very well, and the questions and discussion showed how much demand there is for practical, tool-based help with the new policy.

# Looking Ahead

Day one set the tone for the week: the most useful innovation is not always the newest tool, but the workflows, governance, and strategy around it. Next up is our recap of the [Chicago Innovate Symposium](https://laz-ap.github.io/thoughts/Chicago-Innovate-2026-Symposium) at 800 Fulton Market.

*This post was originally published on the Perkins&Will Digital Practice blog, with contributions from Chaz McRhea and Shilpa Pandey.*
