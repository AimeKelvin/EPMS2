const samples = {
  salaries: [
    {
      SalaryId: 1,
      GrossSalary: 500000,
      TotalDeduction: 50000,
      NetSalary: 450000,
      Month: "January 2026"
    },
    {
      SalaryId: 2,
      GrossSalary: 700000,
      TotalDeduction: 70000,
      NetSalary: 630000,
      Month: "January 2026"
    },
    {
      SalaryId: 3,
      GrossSalary: 450000,
      TotalDeduction: 45000,
      NetSalary: 405000,
      Month: "January 2026"
    }
  ],
  departments: [
    {
      DepartmentCode: "HR01",
      DepartmentName: "Human Resource",
      SalaryId: 1
    },
    {
      DepartmentCode: "IT01",
      DepartmentName: "Information Technology",
      SalaryId: 2
    },
    {
      DepartmentCode: "FN01",
      DepartmentName: "Finance",
      SalaryId: 3
    }
  ],
  employees: [
    {
      FirstName: "Kelvin",
      LastName: "Shimwa",
      DepartmentCode: "IT01",
      Position: "Frontend Developer",
      Address: "Kigali",
      Telephone: "0781234567",
      Gender: "Male",
      HiredDate: "2025-01-10"
    },
    {
      FirstName: "Alice",
      LastName: "Uwase",
      DepartmentCode: "HR01",
      Position: "HR Manager",
      Address: "Musanze",
      Telephone: "0798765432",
      Gender: "Female",
      HiredDate: "2024-06-15"
    },
    {
      FirstName: "David",
      LastName: "Mugisha",
      DepartmentCode: "FN01",
      Position: "Accountant",
      Address: "Huye",
      Telephone: "0723456789",
      Gender: "Male",
      HiredDate: "2023-03-20"
    }
  ]
};

export default samples;
