export const templates = [
  {
    id: "blank",
    name: "Blank Document",
    content: "<p></p>",
  },
  {
    id: "invoice",
    name: "Invoice Template",
    content: `
        <h1 dir="auto">{{Company Name}}</h1><p dir="auto"></p><p dir="auto"></p><div class="columns" cols="2"><div class="column" index="0"><h3 dir="auto" style="text-align: left">{{Client Name}}</h3><p dir="auto" style="text-align: left"></p><p dir="auto" style="text-align: left"><span style="font-size: 18px">Invoice Date: <strong>{{Invoice Date}}</strong></span></p><p dir="auto" style="text-align: left"><span style="font-size: 18px">Invoice No: <strong>{{Invoice Number}}</strong></span></p></div><div class="column" index="1"><p dir="auto" style="text-align: right">{{Name of company}} Co</p><p dir="auto" style="text-align: right">{{Company street}}</p><p dir="auto" style="text-align: right">{{Company post address}}</p><p dir="auto" style="text-align: right">{{company email}}</p></div></div><p dir="auto"></p><p dir="auto"></p><table style="border: 1px solid #000; border-collapse: collapse; width: 100%; min-width: 758px"><colgroup><col style="width: 72px"><col style="width: 531px"><col style="width: 130px"><col style="min-width: 25px"></colgroup><tbody><tr style="border-bottom: 1px solid #000;"><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="72"><p dir="auto"><strong><u>QTY</u></strong></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="531"><p dir="auto"><strong>DESCRIPTION</strong></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="130"><p dir="auto" style="text-align: left">PRICE</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto" style="text-align: center">SUBTOTAL</p></td></tr><tr style="border-bottom: 1px solid #000;"><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="72"><p dir="auto">2</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="531"><p dir="auto">{{item}}</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="130"><p dir="auto">{{$price}}</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><strong>{{price}}</strong></p></td></tr><tr style="border-bottom: 1px solid #000;"><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="72"><p dir="auto">4</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="531"><p dir="auto">{{item}}</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="130"><p dir="auto">{{$price}}</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><strong>{{$price}}</strong></p></td></tr><tr style="border-bottom: 1px solid #000;"><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="72"><p dir="auto">5</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="531"><p dir="auto">{{item}}</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="130"><p dir="auto">{{$price}}</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><strong>{{$price}}</strong></p></td></tr></tbody></table><p dir="auto"></p><table style="border: 1px solid #000; border-collapse: collapse; width: 100%; min-width: 654px"><colgroup><col style="width: 220px"><col style="width: 409px"><col style="min-width: 25px"></colgroup><tbody><tr style="border-bottom: 1px solid #000;"><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="220"><p dir="auto"><strong>PAYMENT INFO</strong></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="409"><p dir="auto"><strong>DUE BY</strong></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><strong>TOTAL DUE</strong></p></td></tr><tr style="border-bottom: 1px solid #000;"><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="220"><p dir="auto" style="line-height: 100%">Account No: {{number}}</p><p dir="auto" style="line-height: 100%">Routing No: {{number}}</p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="409"><p dir="auto"><span style="font-size: 26px">{{Due By Date}}</span></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><span style="font-size: 28px; color: #F5222D"><strong>{{$Total Due}}</strong></span></p></td></tr></tbody></table><p dir="auto"></p><p dir="auto"></p><p dir="auto"></p><table style="border: 1px solid #000; border-collapse: collapse; width: 100%; min-width: 425px"><colgroup><col style="width: 163px"><col style="width: 187px"><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr style="border-bottom: 1px solid #000;"><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="163"><p dir="auto"><span style="font-size: 20px"><strong>❤️ Thank you! </strong></span></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1" colwidth="187"><p dir="auto"></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><span style="font-size: 14px">{{Company Email}}</span></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><span style="font-size: 14px">{{Company Phone}}</span></p></td><td style="
            border-right: 1px solid #000; 
            padding: 8px 12px;            
            &amp;:last-child {
              border-right: none;        
            }
          " colspan="1" rowspan="1"><p dir="auto"><span style="font-size: 14px">{{Company Website}}</span></p></td></tr></tbody></table><p dir="auto"></p>
        `,
  },
  {
    id: "meeting-notes",
    name: "Team Meeting Agenda",
    content: `
<h2 dir="auto" style="text-align: center">Weekly Team Meeting Agenda</h2><p dir="auto"><strong>Date:</strong> {{Date}}</p><p dir="auto"><strong>Time: </strong>{{Time}}</p><p dir="auto"><strong>Participants:</strong> {{participants}}</p><p dir="auto"><strong>Organizer:</strong> {{name}}</p><div data-type="horizontalRule"><hr></div><ol><li><p dir="auto"><span style="font-size: 20px"><strong>Welcome and Agenda Review (5 min)</strong></span></p><ul><li><p dir="auto">Greet the team</p></li><li><p dir="auto">Confirm today's agenda</p></li><li><p dir="auto">Adjust or add topics if needed</p></li></ul></li><li><p dir="auto"><span style="font-size: 20px"><strong>Wins and Highlights (5-10 min)</strong></span></p><ul><li><p dir="auto">Share key wins and <span style="font-size: 16px">major</span> achievements</p></li><li><p dir="auto">Recognize team and individual successes</p></li></ul></li><li><p dir="auto"><span style="font-size: 20px"><strong>Review of Previous Action Items (5-10 min)</strong></span></p><ul><li><p dir="auto"><span style="font-family: Arial, sans-serif; font-size: 16px; color: #FFFFFF">Update on action items from the previous meeting</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 16px; color: #FFFFFF">Discuss blockers or incomplete tasks</span></p></li></ul></li><li><p dir="auto"><span style="font-family: Arial, sans-serif; font-size: 20px; color: #FFFFFF"><strong> Team Updates (15–20 min)</strong></span></p><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Each participant (1–2 minutes each):</span></p><ul><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Progress on current projects</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Challenges or roadblocks</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Any support or collaboration needed</span></p></li></ul></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 20px; color: rgb(255, 255, 255)"><strong> Discussion Topics and Decisions (15–20 min)</strong></span></p><ul><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Topic 1</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Topic 2</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Topic 3 (<em>Prioritize critical discussions and assign a time limit to each if needed</em>)</span></p></li></ul><p dir="auto" style="line-height: 1.38"></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 17pt; color: #FFFFFF"><strong> Planning for Next Week (10 min)</strong></span></p><ul><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Set key priorities and objectives</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Assign new action items with owners and deadlines</span></p></li></ul><p dir="auto" style="line-height: 1.38"></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 17pt; color: #FFFFFF"><strong> Open Floor (Optional, 5 min)</strong></span></p><ul><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Open discussion for questions, announcements, or quick updates</span></p></li></ul><p dir="auto" style="line-height: 1.38"></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 17pt; color: #FFFFFF"><strong> Summary and Next Steps (5 min)</strong></span></p><ul><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Recap key points, decisions, and tasks assigned</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Confirm next meeting date and preliminary agenda items</span></p></li></ul><div data-type="horizontalRule"><hr></div><h2 dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 17pt; color: #FFFFFF"><strong>&nbsp;</strong></span><span style="font-family: Arial, sans-serif; font-size: 22px; color: #FFFFFF"><strong>Action Items</strong></span></h2><ul><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Task: [Insert Task] – Owner: [Insert Name] – Due Date: [Insert Date]</span></p></li><li><p dir="auto" style="line-height: 1.38"><span style="font-family: Arial, sans-serif; font-size: 11pt; color: #FFFFFF">Task: [Insert Task] – Owner: [Insert Name] – Due Date: [Insert Date]</span></p></li></ul></li></ol><p dir="auto"></p>
    `,
  },
  {
    id: "cover-letter",
    name: "Cover Letter",
    content: `
          <h1 dir="auto"><span style="font-size: 48px">{{Name Surname}}</span></h1><p dir="auto"></p><p dir="auto" data-indent="2"><span style="font-size: 22px"><strong>Contact Information</strong></span></p><p dir="auto" data-indent="2"></p><p dir="auto" data-indent="2"><span style="font-size: 18px">{{Phone number}}</span></p><p dir="auto" data-indent="2"><span style="font-size: 18px">{{Email}}</span></p><p dir="auto" data-indent="2"><span style="font-size: 18px">{{Address}}</span></p><p dir="auto" data-indent="2"></p><p dir="auto" data-indent="2"><span style="font-size: 22px"><strong>To</strong></span></p><p dir="auto" data-indent="2"><span style="font-size: 18px">{{Person Name(HR, CEO etc)}}</span></p><p dir="auto" data-indent="2"><span style="font-size: 18px">{{Company Name}}</span></p><p dir="auto" data-indent="2"><span style="font-size: 18px">{{Address}}</span></p><p dir="auto" data-indent="2"></p><p dir="auto" data-indent="2"><span style="font-size: 22px"><strong>Dear {{Person Name}},</strong></span></p><p dir="auto" data-indent="2"><span style="font-size: 16px">Here will be the text of your perfect cover letter. Feel free to write anything here!</span></p><p dir="auto" data-indent="2"></p><p dir="auto" data-indent="2"><span style="font-size: 16px"><strong>{{Your Name}}</strong></span></p><p dir="auto" data-indent="2"><span style="font-size: 16px">{{Month Day, Year}}</span></p>
        `,
  },
  {
    id: "business-letter",
    name: "Business Letter",
    content: `
         <p dir="auto"><span style="font-family: Lucida Console; font-size: 18px">Date</span></p><h2 dir="auto" style="line-height: 200%"><span style="font-family: Lucida Console; font-size: 36px">RECIPIENT NAME</span></h2><p dir="auto" style="line-height: 200%"><span style="font-family: Lucida Console; font-size: 18px">ADDRESS | CITY, ST ZIP CODE</span></p><p dir="auto"></p><p dir="auto"><span style="font-family: Lucida Console">To get started right away, just tap any placeholder text (such as this) and start typing.</span></p><p dir="auto"></p><p dir="auto"><span style="font-family: Lucida Console">Use styles to easily format your documents in no time. Feel free to add any text that you need here.</span></p><p dir="auto"></p><p dir="auto"><span style="font-family: Lucida Console">SINCERELY,</span></p><p dir="auto"></p><p dir="auto"><span style="font-family: Lucida Console">YOUR NAME</span></p><p dir="auto"></p><blockquote class="blockquote"><p dir="auto"><span style="font-size: 20px">Address | City, St Zip Code</span></p></blockquote><p dir="auto"></p>
        `,
  },
  {
    id: "resume",
    name: "Resume",
    content: `
         <p dir="auto" style="text-align: center">
         <span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 24pt">
         <strong>Full Name</strong></span></p>
         <p dir="auto" style="text-align: center; line-height: 1.38">
         City, Country | Phone | Email | LinkedIn | Portfolio/Website
         </p>
         <div data-type="horizontalRule">
         <hr>
         </div>
         <p dir="auto" style="line-height: 1.38">
         <span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 16pt">
         <strong>PROFESSINAL SUMMARIES</strong></span></p><p dir="auto">A short paragraph (2–4 sentences) summarizing your experience, strengths, and career goals.</p><div data-type="horizontalRule"><hr></div><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 16pt"><strong>SKILLS</strong></span></p><ul><li><p dir="auto" style="line-height: 1.60364">Skill 1</p></li><li><p dir="auto" style="line-height: 1.60364">Skill 2</p></li><li><p dir="auto" style="line-height: 1.60364">Skill 3</p></li><li><p dir="auto" style="line-height: 1.60364">Skill 4</p></li><li><p dir="auto" style="line-height: 1.60364">Skill 5<strong>&nbsp;</strong></p></li></ul><div data-type="horizontalRule"><hr></div><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 16pt"><strong>WORK EXPERIENCE</strong></span></p><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 14pt"><strong>Company Name</strong><br><em>Job Title, MM/YYYY - present</em></span></p><ul><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li></ul><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 14pt"><strong>Company Name</strong><br><em>Job Title, MM/YYYY - MM/YYYY</em></span></p><ul><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li></ul><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 14pt"><strong>Company Name</strong></span></p><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 14pt">Job Title, MM/YYYY - MM/YYYY</span></p><ul><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li><li><p dir="auto" style="line-height: 1.60364">Bullet describing responsibility or accomplishment</p></li></ul><div data-type="horizontalRule"><hr></div><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 24px"><strong>EDUCATION</strong></span></p><p dir="auto" style="line-height: 1.60364">School Name</p><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 14pt"><em>Degree, MM/YYYY - MM/YYYY</em></span></p><ul><li><p dir="auto" style="line-height: 1.60364">Optional: GPA, achievements, relevant coursework</p></li></ul><div data-type="horizontalRule"><hr></div><p dir="auto" style="line-height: 1.60364"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 16pt"><strong>CERTIFICATIONS/COURSES (OPTIONAL)</strong></span></p><ul><li><p dir="auto" style="line-height: 1.60364">Certification or Course — Platform/Institution — Year</p></li></ul><div data-type="horizontalRule"><hr></div><p dir="auto"><span style="font-family: &quot;Times New Roman&quot;, serif; font-size: 16pt"><strong>PROJECTS (OPTIONAL)</strong></span></p><p dir="auto"><strong>Project Name</strong> — Short description of what you built and impact/results</p><ul><li><p dir="auto">Tools/Tech: List key technologies</p></li></ul><p dir="auto"><strong>Project Name</strong> — Short description of what you built and impact/results</p><ul><li><p dir="auto">Tools/Tech: List key technologies</p></li></ul><div data-type="horizontalRule"><hr></div><h2 dir="auto">Languages</h2><ul><li><p dir="auto">Language — Proficiency Level</p></li></ul><div data-type="horizontalRule"><hr></div><h2 dir="auto">Interests (Optional)</h2><ul><li><p dir="auto">Interest 1, Interest 2, Interest 3</p></li></ul><p dir="auto"></p>
        `,
  }
];
