import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// // const element= React.createElement("h1",null,"Welcome to react programming World...")
// const element= React.createElement("div",{className:"testClass"},
// React.createElement("h1",{className:"test2Class"},"Welcome to react programming..."),
// React.createElement("h1",null,"Understanding the creation of Elements..."))
// // const element = <h1 className='testClass'>Welcome to react programming...</h1>;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   element
// );


// const newElement = <h1 className='testClass'>Hi Elham...</h1>;

// const app = ReactDOM.createRoot(document.getElementById('app'));
// app.render(
//   newElement
// );

// const element= <div className='testClass'>
//   <h1> welcome to react programming...</h1>
//   <h1> Hi...</h1>
// </div>

// root.render(
//   element
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// var DisplayEmploeeInfo=(employee)=>{
//   return <div>
//     <h1>Employee Details...</h1>
//     <p>
//       <label>Employee ID: <b>{employee.ID}</b></label>
//     </p>
//     <p>
//       <label>Employee Name: <b>{employee.Name}</b></label>
//     </p>
//     <p>
//       <label>Employee Location: <b>{employee.Location}</b></label>
//     </p>
//     <p>
//       <label>Employee Salary: <b>{employee.Salary}</b></label>
//     </p>
//     <Department deptName={employee.deptName}  deptHead={employee.deptHead}></Department>
//   </div>;
// }

// const Department=(deptInfo)=>{
//   return <div><p>Dept Name is: <b>{deptInfo.deptName}</b></p>
//   <p>Dept Head is: <b>{deptInfo.deptHead}</b></p>
//   </div>;
// }

// const element=<DisplayEmploeeInfo ID="205" Name="Elham" Location="Berlin" Salary="5000 Euro" deptName="NASA" deptHead="Elham Rahmati"></DisplayEmploeeInfo>
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(element);

// class Employee extends React.Component{
//   render(){
//     return <div>
//       <h1>Employee Details...</h1>
//       <p>
//         <label>Employee ID: <b>{this.props.ID}</b></label>
//       </p>
//       <p>
//         <label>Employee Name: <b>{this.props.Name}</b></label>
//       </p>
//       <p>
//         <label>Employee Location: <b>{this.props.Location}</b></label>
//       </p>
//       <p>
//         <label>Employee Salary: <b>{this.props.Salary}</b></label>
//       </p>
//       <Department DeptName ={this.props.DeptName} HeadName ={this.props.HeadName}> </Department>
//     </div>

//   }
// }


// class Department extends React.Component{
//   render(){
//     return <div>
//       <h2>Department Details...</h2>
//       <p>
//         <lable>Dept Name : <b>{this.props.DeptName}</b></lable>
//        </p>
//        <p>
//         <lable>Head Name : <b>{this.props.HeadName}</b></lable>
//        </p>
//     </div>
//   }
// }


// const element=<Employee ID="205" Name="Elham" Location="Berlin" Salary="5000 Euro" DeptName = "NASA" HeadName="Elham Rahmati"></Employee>
//          const root = ReactDOM.createRoot(document.getElementById("root"));
//          root.render(element);

// class Employee extends React.Component{
//   counter = 0;
//   addEmployee =() => {
//     this.counter = this.counter + 1;
//     // alert("Adding a New Employee");
//     // alert("Add Employee Button is clicked" + this.counter + "times")
//   }
//   render(){
//     return <div>
//       <h2>welcome to Employee Component...</h2>
//       <p>
//         <button onClick={this.addEmployee}>Add Employee</button>
//       </p>
//       <p>
//         <label>Add Employee Button is Clicked : <b>{this.counter}</b> times </label>
//       </p>
//     </div>
//   }
// }

// const Element = <Employee></Employee>

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(Element);

// class Employee extends React.Component{
//   state={counter : 0};
//   addEmployee = () => {
//     this.setState ({counter : this.state.counter + 1});
//     // this.counter = this.counter + 1;
//     // alert("adding a New Employee");
//     // alert("Add Employee Button is Clicked " + this.counter +" times")
//   }
//   render(){
//     return <div>
//       <h2>Welcome to Employee Component...</h2>
//       <p>
//         <button onClick={this.addEmployee}>Add Employee...</button>
//       </p>
//       <p>
//         <label> Add Employee Button is Clicked: <b>{this.state.counter}</b> times</label>
//       </p>
//     </div>

//   }
// }

// const Element = <Employee></Employee>

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(Element);

// class Employee extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       updatedSalary:null
//     };
//   }

//   getUpdatedSalary = (salary) =>{
//     this.setState({updatedSalary:salary});
//   }
//   render(){
//     return <div>
//       <h1> Employee Component...</h1>
//       <p>
//         <label> Id : <b>{this.props.Id}</b></label>
//       </p>
//       <p>
//         <label>Name : <b>{this.props.Name}</b></label>
//       </p>
//       <p>
//         <label> Location : <b>{this.props.Location}</b></label>
//       </p>
//       <p>
//         <label> Total Salary : <b>{this.props.Salary}</b></label>
//       </p>
//       <p>
//         <label>Updated Total Salary : <b>{this.state.updatedSalary}</b></label>
//       </p>
//       <Salary BasicSalary={this.props.BasicSalary}  HRA={this.props.HRA}  SpecialAllowance={this.props.SpecialAllowance} onSalaryChanged={this.getUpdatedSalary}></Salary>
//     </div>
//   }
// }


// class Salary extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       basic:this.props.BasicSalary,
//       hra:this.props.HRA,
//       sa:this.props.SpecialAllowance
//     };
//   }

//   updateSalary =()=>{
//     let salary=parseInt(this.ref.basic.value)+parseInt(this.ref.hra.value)+parseInt(this.ref.sa.value);
//     this.props.onSalaryChanged(salary);

//   }

//   render(){
//     return <div>
//       <h1> Salary Details...</h1>
//       <p>
//         <label> Basic Salary : <input type={"text"} ref={"basic"} defaultValue={this.state.basic}></input></label>
//       </p>
//       <p>
//         <label> HRA : <input type={"text"} ref={"hra"} defaultValue={this.state.hra}></input></label>
//       </p>
//       <p>
//         <label> Special Allowance : <input type={"text"} ref={"sa"} defaultValue={this.state.sa}></input></label>
//       </p>
//       <button onClick={this.updateSalary}>Update</button>
//     </div>
//   }
// }

// const Element = <Employee Id ="200" Name="Elham" Location = "Berlin" Total Salary = "70000" BasicSalary = "50000" HRA = "20000" SpecialAllowance ="30000"></Employee>
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(Element)

// const EmployeeContext = React.createContext();
// class Appp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       Id:200,
//       Name:"Elham",
//       Location:"Berlin",
//       Salary:65000
//     };
//   }
//   changeEmployeeData=()=>{
//     this.setState({Id:201});
//   }
//   render() {
//     console.log(this.state)
//     return <div>
//               <h2>Welcome to App Component</h2>
//               <p>
//                 <label>Employee ID: <b>{this.state.Id}</b></label>
//               </p>
//               <EmployeeContext.Provider value={this.state}>
//                 <Employee></Employee>
//               </EmployeeContext.Provider>
//               <p>
//                 <button onClick={this.changeEmployeeData}>Update</button>
//               </p>
//            </div>
//   }
// }

//  class Employee extends React.Component {
//   static contextType=EmployeeContext;

//   render() {
//     console.log(this.context)
//    return <div>
//              <h2>Welcome to Employee Component...</h2>
//              <p>
//               <label>Employee ID: <b>{this.context.Id}</b></label>
//              </p>
//              <Salary></Salary>
//           </div>
//   }
//  }

//  class Salary extends React.Component {
//   static contextType=EmployeeContext;

//   render(){
//     console.log(this.context)
//     return <div>
//               <h2>Welcome to Salary Component...</h2>
//               <p>
//                 <label>Employee ID: <b>{this.context.Id}</b></label>
//               </p>
//            </div>
//   }
//  }
// const Element= <Appp></Appp>
// const root=ReactDOM.createRoot(document.getElementById("root"));
// root.render(Element)

// reportWebVitals();

// import './index.css';
// import reportWebVitals from './reportWebVitals';

// const EmployeeContext = React.createContext({
    //   data:'',
    //   changeEmployeeInfo:()=>{
    //   }
    // });
    // class Appp extends React.Component {
    //   constructor(props) {
    //     super(props);
    //     this.state={
    //       data: {
    //         Id:200,
    //         Name:"Elham",
    //         Location:"Berlin",
    //         Salary:65000
    //       },
    //       changeEmployeeInfo:this.updateEmployeeDetails
    //     };
    //   }
    
    //   updateEmployeeDetails=()=>{
    //     this.setState({data:{Id:201}});
    //   }
    
    //   render() {
    //     console.log(this.state)
    //     return <div>
    //               <h2>Welcome to App Component</h2>
    //               <p>
    //                 <label>Employee ID: <b>{this.state.data.Id}</b></label>
    //               </p>
    //               <EmployeeContext.Provider value={this.state}>
    //                 <Employee></Employee>
    //               </EmployeeContext.Provider>
                  
    //            </div>
    //   }
    // }
    
    //  class Employee extends React.Component {
    //   static contextType=EmployeeContext;
    
    //   render() {
    //     console.log(this.context)
    //    return <div>
    //              <h2>Welcome to Employee Component...</h2>
    //              <p>
    //               <label>Employee ID: <b>{this.context.data.Id}</b></label>
    //              </p>
    //              <button onClick={this.context.changeEmployeeInfo}>Change</button>
    //           </div>
    //   }
    //  }
    
    // const Element= <Appp></Appp>
    // const root=ReactDOM.createRoot(document.getElementById("root"));
    // root.render(Element)


    // function Employee(props){
    //     return <div style={{border:'3px solid green'}}>
    //       <p>
    //         <label>Employee ID : <b>{props.data.Id}</b></label>
    //       </p>
    //       <p>
    //         <label>Employee Name : <b>{props.data.Name}</b></label>
    //       </p>
    //       <p>
    //        <label>Employee Location : <b>{props.data.location}</b></label>
    //       </p>
    //       <p>
    //        <label>Employee Salary : <b>{props.data.Salary}</b></label>
    //       </p>
    //     </div>
    //   }
    //   function DisplayEmployees(props){
    //     const empList=props.employeeList;
      
    //     const listElements=empList.map((emp)=>
    //             <Employee key={emp.Id} data={emp}></Employee>
    //     );
      
    //     return (
    //       <div>
    //         {listElements}
    //       </div>
    //     );
    //   }
    //   const employees = [
    //     {Id:200, Name: 'Elham', Location:'Potsdam', Salary:55000},
    //     {Id:201, Name: 'Mohammad', Location:'Berlin', Salary:60000},
    //     {Id:202, Name: 'Saeed', Location:'Bremen', Salary:55000}
    //   ];
      
    
    // reportWebVitals();
    
