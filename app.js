// Enhanced HRMS Application JavaScript with Role-Based Access Control
class HRMSApp {
    constructor() {
        this.currentModule = 'dashboard';
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Enhanced authentication data with RBAC
        this.users = [
            {
                id: "USER001",
                username: "admin",
                password: "admin123",
                name: "System Administrator",
                email: "admin@tade.com",
                roles: ["ROLE001"],
                status: "Active",
                lastLogin: "2025-09-01T00:00:00Z"
            },
            {
                id: "USER002",
                username: "hrmanager",
                password: "hr123",
                name: "HR Manager",
                email: "hr@tade.com",
                roles: ["ROLE002"],
                status: "Active",
                lastLogin: "2025-08-31T18:30:00Z"
            },
            {
                id: "USER003",
                username: "employee1",
                password: "emp123",
                name: "John Doe",
                email: "john@tade.com",
                roles: ["ROLE004"],
                status: "Active",
                lastLogin: "2025-08-31T09:00:00Z"
            }
        ];

        this.roles = [
            {
                id: "ROLE001",
                name: "System Administrator",
                description: "Full system access and administration rights",
                permissions: ["ALL"],
                status: "Active",
                createdDate: "2024-01-01",
                createdBy: "SYSTEM"
            },
            {
                id: "ROLE002",
                name: "HR Manager",
                description: "Human Resources management and employee operations",
                permissions: ["workorder.all", "manpower.all", "onboarding.all", "hr-management.all", "grievances.all", "dashboard.read", "refer-program.all"],
                status: "Active",
                createdDate: "2024-01-01",
                createdBy: "USER001"
            },
            {
                id: "ROLE003",
                name: "Department Manager",
                description: "Department level management and approvals",
                permissions: ["dashboard.read", "hr-management.approve", "grievances.manage", "manpower.read"],
                status: "Active",
                createdDate: "2024-01-01",
                createdBy: "USER001"
            },
            {
                id: "ROLE004",
                name: "Employee",
                description: "Basic employee access for personal data and requests",
                permissions: ["grievances.create", "hr-management.read.own", "dashboard.read.own"],
                status: "Active",
                createdDate: "2024-01-01",
                createdBy: "USER001"
            }
        ];
        
        // Enhanced data structure with new requirements
        this.data = {
            workOrders: [
                {
                    id: "WO001",
                    workOrderNumber: "WO-2024-001",
                    clientName: "Tech Solutions Inc",
                    clientLocation: "", // Kept blank for manual entry
                    spocNumber: "+91 9876543210",
                    spocEmail: "contact@techsolutions.com",
                    workOrderType: "", // Kept blank for manual entry
                    durationFrom: "2024-01-01",
                    durationTo: "2024-12-31",
                    bgSecurityDeposit: "500000",
                    jobOpenings: [
                        {
                            id: "JO001",
                            positionTitle: "Software Engineer",
                            numberOfOpenings: 3,
                            salary: 75000,
                            assignedEmployees: [
                                {
                                    employeeId: "EMP001",
                                    status: "Active",
                                    assignmentDate: "2024-01-15",
                                    exitDate: null
                                }
                            ]
                        },
                        {
                            id: "JO002",
                            positionTitle: "Project Manager",
                            numberOfOpenings: 1,
                            salary: 120000,
                            assignedEmployees: []
                        }
                    ],
                    status: "Active",
                    createdDate: "2024-01-01",
                    createdBy: "USER002"
                }
            ],
            employees: [
                {
                    id: "EMP001",
                    firstName: "Rajesh",
                    middleName: "Kumar",
                    lastName: "Sharma",
                    contactNumber: "+91 9876543212",
                    email: "rajesh.sharma@tade.com",
                    location: "", // Kept blank for manual entry
                    positionApplied: "", // Kept blank for manual entry
                    positionRole: "Senior Developer",
                    experience: "5 years",
                    accountNumber: "1234567890",
                    ifscCode: "HDFC0001234",
                    uanNumber: "123456789012",
                    esicNumber: "1234567890",
                    reference1: {"name": "Amit Singh", "mobile": "+91 9876543213"},
                    reference2: {"name": "Priya Gupta", "mobile": "+91 9876543214"},
                    policeVerification: "Completed",
                    declaration: "Submitted",
                    status: "Active",
                    joiningDate: "2024-01-15",
                    salary: 75000,
                    workOrderAssignments: [
                        {
                            workOrderId: "WO001",
                            openingId: "JO001",
                            assignmentDate: "2024-01-15",
                            status: "Active"
                        }
                    ]
                }
            ],
            attendance: [
                {
                    id: "ATT001",
                    employeeId: "EMP001",
                    employeeName: "Rajesh Kumar Sharma",
                    month: "2024-09",
                    year: 2024,
                    daysWorked: 22,
                    daysAbsent: 2,
                    holidays: 4,
                    totalDays: 30,
                    workingDaysInMonth: 26,
                    status: "Submitted",
                    submittedBy: "USER002",
                    submittedDate: "2024-09-30"
                }
            ],
            salaryRecords: [
                {
                    id: "SAL001",
                    employeeId: "EMP001",
                    employeeName: "Rajesh Kumar Sharma",
                    month: "2024-09",
                    year: 2024,
                    basicSalary: 75000,
                    daysWorked: 22,
                    workingDays: 26,
                    grossSalary: 63461.54,
                    deductions: {
                        pf: 7615.38,
                        esi: 634.62,
                        tds: 2500
                    },
                    netSalary: 52711.54,
                    status: "Processed",
                    processedBy: "USER002",
                    processedDate: "2024-10-01"
                }
            ],
            leaveApplications: [],
            grievances: [
                {
                    id: "GRIEV001",
                    employeeId: "EMP001",
                    employeeName: "Rajesh Kumar Sharma",
                    subject: "Workspace Issue",
                    description: "Request for better seating arrangement",
                    priority: "Medium",
                    status: "Open",
                    submittedDate: "2024-03-10",
                    resolutionTime: "3 days"
                }
            ],
            documents: [
                {
                    id: "DOC001",
                    employeeId: "EMP001",
                    employeeName: "Rajesh Kumar Sharma",
                    type: "Offer Letter",
                    generatedDate: "2024-01-10",
                    status: "Generated",
                    generatedBy: "USER002"
                }
            ],
            assignments: [
                {
                    id: "ASSIGN001",
                    employeeId: "EMP001",
                    workOrderId: "WO001",
                    openingId: "JO001",
                    assignmentDate: "2024-01-15",
                    status: "Active",
                    exitDate: null,
                    replacedBy: null,
                    assignedBy: "USER002"
                }
            ]
        };
        
        this.config = {
            company: {
                name: "TADE Techno Solution Private Limited",
                address: "Business District, Mumbai, India",
                phone: "+91 22 1234 5678",
                email: "info@tadetechno.com",
                website: "www.tadetechno.com",
                cin: "U72900MH2020PTC123456",
                pan: "AABCT1234C",
                gstin: "27AABCT1234C1Z5"
            },
            modules: [
                {"id": "dashboard", "name": "Dashboard/Reports", "description": "Analytics and reporting"},
                {"id": "workorder", "name": "Work Order/PO Entry", "description": "Work order management"},
                {"id": "manpower", "name": "Manpower Details", "description": "Employee information management"},
                {"id": "onboarding", "name": "Employee Onboarding", "description": "Document generation and onboarding"},
                {"id": "hr-management", "name": "HR Management", "description": "Attendance, leave, and salary management"},
                {"id": "grievances", "name": "Employee Grievances", "description": "Help desk and issue resolution"},
                {"id": "refer-program", "name": "Refer Program", "description": "Employee referral and communication"},
                {"id": "rbac", "name": "Role-Based Access Control", "description": "User and permission management"}
            ],
            actions: ["create", "read", "update", "delete", "approve", "all"],
            dataLevels: ["own", "department", "all"],
            documentTypes: ["Offer Letter", "Appointment Letter", "Increment Letter", "Extension Letter", "Pay Slip", "Form 16"],
            salaryComponents: {
                deductions: {"pf": 12, "esi": 1, "tds": 0},
                allowances: {"basic": 60, "hra": 25, "other": 15}
            },
            excelTemplate: {
                columns: [
                    "Employee Name", "Contact Number", "Email ID", "Location",
                    "Position Applied", "Position Role", "Experience", 
                    "Account Number", "IFSC Code", "UAN Number", "ESIC Number",
                    "Reference 1 Name", "Reference 1 Mobile", 
                    "Reference 2 Name", "Reference 2 Mobile",
                    "Police Verification", "Declaration"
                ]
            }
        };
        
        this.currentSubmitCallback = null;
        this.init();
    }
    
    init() {
        this.showLoginScreen();
        this.hideAllModals();
        this.bindEvents();
        this.bindLoginEvents();
    }
    
    showLoginScreen() {
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (mainApp) mainApp.classList.add('hidden');
    }
    
    showMainApp() {
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen) loginScreen.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        this.switchModule('dashboard');
        this.updateDashboardStats();
        this.updateUserInfo();
        this.applyRoleBasedAccess();
    }
    
    bindLoginEvents() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }
    
    handleLogin() {
        const username = document.getElementById('loginUsername');
        const password = document.getElementById('loginPassword');
        const loginButton = document.getElementById('loginButton');
        const loginError = document.getElementById('loginError');
        const loginBtnText = loginButton?.querySelector('.login-btn-text');
        const loginSpinner = loginButton?.querySelector('.login-spinner');
        
        if (!username || !password) {
            console.error('Login form elements not found');
            return;
        }
        
        const usernameValue = username.value.trim();
        const passwordValue = password.value.trim();
        
        // Clear previous errors
        if (loginError) loginError.classList.add('hidden');
        
        if (!usernameValue || !passwordValue) {
            this.showLoginError('Please enter both username and password.');
            return;
        }
        
        // Show loading state
        if (loginButton) loginButton.disabled = true;
        if (loginBtnText) loginBtnText.classList.add('hidden');
        if (loginSpinner) loginSpinner.classList.remove('hidden');
        
        // Simulate authentication delay
        setTimeout(() => {
            const user = this.authenticateUser(usernameValue, passwordValue);
            
            if (user) {
                // Successful login
                this.currentUser = user;
                this.isAuthenticated = true;
                this.showMainApp();
                this.showSuccessMessage(`Welcome, ${user.name}!`);
                
                // Clear login form
                if (username) username.value = '';
                if (password) password.value = '';
            } else {
                // Failed login
                this.showLoginError('Invalid username or password. Please try again.');
                // Clear password field
                if (password) password.value = '';
            }
            
            // Reset loading state
            if (loginButton) loginButton.disabled = false;
            if (loginBtnText) loginBtnText.classList.remove('hidden');
            if (loginSpinner) loginSpinner.classList.add('hidden');
        }, 800);
    }
    
    authenticateUser(username, password) {
        return this.users.find(user => 
            user.username === username && user.password === password
        );
    }
    
    showLoginError(message) {
        const loginError = document.getElementById('loginError');
        if (loginError) {
            loginError.textContent = message;
            loginError.classList.remove('hidden');
        }
    }
    
    updateUserInfo() {
        if (!this.currentUser) return;
        
        const userRoleEl = document.getElementById('currentUserRole');
        const userNameEl = document.getElementById('currentUserName');
        
        if (userRoleEl && userNameEl) {
            const userRole = this.getUserRole(this.currentUser);
            userRoleEl.textContent = userRole ? userRole.name : 'Unknown Role';
            userNameEl.textContent = this.currentUser.name;
        }
    }
    
    getUserRole(user) {
        if (user && user.roles && user.roles.length > 0) {
            return this.roles.find(role => role.id === user.roles[0]);
        }
        return null;
    }
    
    hasPermission(permission) {
        if (!this.currentUser) return false;
        
        const userRole = this.getUserRole(this.currentUser);
        if (!userRole) return false;
        
        // Admin has all permissions
        if (userRole.permissions.includes('ALL')) return true;
        
        // Check specific permissions
        return userRole.permissions.includes(permission) || 
               userRole.permissions.some(p => p.startsWith(permission.split('.')[0] + '.all'));
    }
    
    applyRoleBasedAccess() {
        if (!this.currentUser) return;
        
        const navTabs = document.querySelectorAll('.nav__tab');
        const rbacTab = document.getElementById('rbacTab');
        
        // Get user role to determine access level
        const userRole = this.getUserRole(this.currentUser);
        const isAdmin = userRole && userRole.name === 'System Administrator';
        
        navTabs.forEach(tab => {
            const module = tab.dataset.module;
            
            // Show RBAC tab only for admin - FIXED: Ensure RBAC tab is shown for admin
            if (module === 'rbac') {
                if (isAdmin && rbacTab) {
                    rbacTab.style.display = 'flex';
                } else if (rbacTab) {
                    rbacTab.style.display = 'none';
                }
                return;
            }
            
            // Check module permissions
            if (this.hasPermission(module + '.read') || this.hasPermission('ALL')) {
                tab.style.display = 'flex';
            } else {
                tab.style.display = 'none';
            }
        });
        
        // If current module is not accessible, switch to dashboard
        const currentTab = document.querySelector(`[data-module="${this.currentModule}"]`);
        if (currentTab && currentTab.style.display === 'none') {
            this.switchModule('dashboard');
        }
    }
    
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.showLoginScreen();
        this.showSuccessMessage('Logged out successfully.');
    }
    
    hideAllModals() {
        const formModal = document.getElementById('formModal');
        const viewModal = document.getElementById('viewModal');
        
        if (formModal) formModal.classList.add('hidden');
        if (viewModal) viewModal.classList.add('hidden');
    }
    
    bindEvents() {
        // Navigation events
        const navTabs = document.getElementById('navTabs');
        if (navTabs) {
            navTabs.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav__tab') || e.target.parentElement.classList.contains('nav__tab')) {
                    const tab = e.target.classList.contains('nav__tab') ? e.target : e.target.parentElement;
                    const module = tab.dataset.module;
                    if (module) this.switchModule(module);
                }
            });
        }
        
        // HR Management tabs
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('hr-tab')) {
                const section = e.target.dataset.hrSection;
                if (section) this.switchHRSection(section);
            }
            
            if (e.target.classList.contains('rbac-tab')) {
                const section = e.target.dataset.rbacSection;
                if (section) this.switchRBACSection(section);
            }
        });
        
        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__overlay')) {
                this.closeModal();
                this.closeViewModal();
            }
        });
        
        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeViewModal();
            }
        });
    }
    
    switchModule(module) {
        this.currentModule = module;
        
        // Update navigation
        document.querySelectorAll('.nav__tab').forEach(tab => {
            tab.classList.remove('nav__tab--active');
        });
        
        const activeTab = document.querySelector(`[data-module="${module}"]`);
        if (activeTab) activeTab.classList.add('nav__tab--active');
        
        // Hide all modules
        document.querySelectorAll('.module').forEach(mod => {
            mod.classList.add('hidden');
        });
        
        // Show current module
        const currentModuleElement = document.getElementById(`${module}-module`);
        if (currentModuleElement) currentModuleElement.classList.remove('hidden');
        
        // Load module data
        this.loadModuleData(module);
    }
    
    switchHRSection(section) {
        // Update HR tabs
        document.querySelectorAll('.hr-tab').forEach(tab => {
            tab.classList.remove('hr-tab--active');
        });
        
        const activeTab = document.querySelector(`[data-hr-section="${section}"]`);
        if (activeTab) activeTab.classList.add('hr-tab--active');
        
        // Hide all HR sections
        document.querySelectorAll('.hr-section').forEach(sec => {
            sec.classList.add('hidden');
        });
        
        // Show current section
        const currentSection = document.getElementById(`${section}-section`);
        if (currentSection) currentSection.classList.remove('hidden');
        
        // Load section data
        this.loadHRSectionData(section);
    }
    
    switchRBACSection(section) {
        // Update RBAC tabs
        document.querySelectorAll('.rbac-tab').forEach(tab => {
            tab.classList.remove('rbac-tab--active');
        });
        
        const activeTab = document.querySelector(`[data-rbac-section="${section}"]`);
        if (activeTab) activeTab.classList.add('rbac-tab--active');
        
        // Hide all RBAC sections
        document.querySelectorAll('.rbac-section').forEach(sec => {
            sec.classList.add('hidden');
        });
        
        // Show current section
        const currentSection = document.getElementById(`${section}-section`);
        if (currentSection) currentSection.classList.remove('hidden');
        
        // Load section data
        this.loadRBACSectionData(section);
    }
    
    loadModuleData(module) {
        switch (module) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'workorder':
                this.renderWorkOrders();
                break;
            case 'manpower':
                this.renderEmployees();
                break;
            case 'onboarding':
                this.renderOnboarding();
                break;
            case 'hr-management':
                this.renderHRManagement();
                break;
            case 'grievances':
                this.renderGrievances();
                break;
            case 'refer-program':
                this.renderReferProgram();
                break;
            case 'rbac':
                this.renderRBAC();
                break;
        }
    }
    
    loadHRSectionData(section) {
        switch (section) {
            case 'attendance':
                this.renderAttendanceManagement();
                break;
            case 'salary':
                this.renderSalaryProcessing();
                break;
            case 'leave':
                this.renderLeaveManagement();
                break;
        }
    }
    
    loadRBACSectionData(section) {
        switch (section) {
            case 'roles':
                this.renderRoles();
                break;
            case 'permissions':
                this.renderPermissionMatrix();
                break;
            case 'users':
                this.renderUserRoles();
                break;
            case 'access':
                this.renderAccessLogs();
                break;
        }
    }
    
    updateDashboardStats() {
        const activeWorkOrdersEl = document.getElementById('activeWorkOrders');
        const totalEmployeesEl = document.getElementById('totalEmployees');
        const totalJobOpeningsEl = document.getElementById('totalJobOpenings');
        const openGrievancesEl = document.getElementById('openGrievances');
        
        if (activeWorkOrdersEl) {
            activeWorkOrdersEl.textContent = this.data.workOrders.filter(wo => wo.status === 'Active').length;
        }
        if (totalEmployeesEl) {
            totalEmployeesEl.textContent = this.data.employees.filter(emp => emp.status === 'Active').length;
        }
        if (totalJobOpeningsEl) {
            const totalOpenings = this.data.workOrders.reduce((total, wo) => 
                total + wo.jobOpenings.reduce((sum, jo) => sum + jo.numberOfOpenings, 0), 0
            );
            totalJobOpeningsEl.textContent = totalOpenings;
        }
        if (openGrievancesEl) {
            openGrievancesEl.textContent = this.data.grievances.filter(griev => griev.status === 'Open').length;
        }
    }
    
    renderDashboard() {
        this.updateDashboardStats();
    }
    
    renderWorkOrders() {
        const tbody = document.getElementById('workOrderTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.workOrders.forEach(wo => {
            const totalOpenings = wo.jobOpenings.reduce((sum, jo) => sum + jo.numberOfOpenings, 0);
            const assignedEmployees = wo.jobOpenings.reduce((sum, jo) => sum + jo.assignedEmployees.length, 0);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${wo.workOrderNumber}</td>
                <td>${wo.clientName}</td>
                <td>${wo.clientLocation || '<em>Not specified</em>'}</td>
                <td>${wo.workOrderType || '<em>Not specified</em>'}</td>
                <td>${wo.jobOpenings.length} positions</td>
                <td>${assignedEmployees}/${totalOpenings}</td>
                <td>${wo.durationFrom} to ${wo.durationTo}</td>
                <td><span class="status-badge status-badge--${wo.status.toLowerCase()}">${wo.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--view" onclick="hrms.viewWorkOrder('${wo.id}')">View</button>
                        <button class="action-btn action-btn--edit" onclick="hrms.editWorkOrder('${wo.id}')">Edit</button>
                        <button class="action-btn action-btn--assign" onclick="hrms.manageAssignments('${wo.id}')">Assignments</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    renderEmployees() {
        const tbody = document.getElementById('employeeTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.employees.forEach(emp => {
            const assignment = this.getEmployeeAssignment(emp.id);
            let assignmentText = 'None';
            
            if (assignment) {
                const workOrder = this.data.workOrders.find(wo => wo.id === assignment.workOrderId);
                if (workOrder) {
                    assignmentText = workOrder.workOrderNumber;
                }
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.firstName} ${emp.middleName} ${emp.lastName}</td>
                <td>${emp.positionApplied || '<em>Not specified</em>'}</td>
                <td>${emp.location || '<em>Not specified</em>'}</td>
                <td><span class="assignment-info ${assignment ? 'assignment-active' : 'assignment-none'}">${assignmentText}</span></td>
                <td>${emp.contactNumber}</td>
                <td><span class="status-badge status-badge--${emp.status.toLowerCase()}">${emp.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--view" onclick="hrms.viewEmployee('${emp.id}')">View</button>
                        <button class="action-btn action-btn--edit" onclick="hrms.editEmployee('${emp.id}')">Edit</button>
                        <button class="action-btn action-btn--assign" onclick="hrms.assignToWorkOrder('${emp.id}')">Assign</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    getEmployeeAssignment(employeeId) {
        return this.data.assignments.find(a => a.employeeId === employeeId && a.status === 'Active');
    }
    
    renderOnboarding() {
        const documentsEl = document.getElementById('generatedDocuments');
        if (!documentsEl) return;
        
        if (this.data.documents.length === 0) {
            documentsEl.innerHTML = '<p>No documents generated yet.</p>';
            return;
        }
        
        let documentsHtml = '';
        this.data.documents.forEach(doc => {
            documentsHtml += `
                <div class="document-preview">
                    <div class="document-preview-header">
                        <span class="document-title">${doc.type}</span>
                        <span class="document-date">${doc.generatedDate}</span>
                    </div>
                    <p><strong>Employee:</strong> ${doc.employeeName}</p>
                    <p><strong>Status:</strong> <span class="status-badge status-badge--${doc.status.toLowerCase()}">${doc.status}</span></p>
                </div>
            `;
        });
        
        documentsEl.innerHTML = documentsHtml;
    }
    
    renderHRManagement() {
        this.renderAttendanceManagement();
    }
    
    renderAttendanceManagement() {
        const tbody = document.getElementById('attendanceTableBody');
        const totalEmployeesCountEl = document.getElementById('totalEmployeesCount');
        const attendanceRecordsEl = document.getElementById('attendanceRecords');
        
        if (totalEmployeesCountEl) {
            totalEmployeesCountEl.textContent = this.data.employees.filter(emp => emp.status === 'Active').length;
        }
        if (attendanceRecordsEl) {
            attendanceRecordsEl.textContent = this.data.attendance.length;
        }
        
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.attendance.forEach(att => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${att.employeeName}</td>
                <td>${att.month}</td>
                <td>${att.daysWorked}</td>
                <td>${att.daysAbsent}</td>
                <td>${att.holidays}</td>
                <td>${att.totalDays}</td>
                <td><span class="status-badge status-badge--${att.status.toLowerCase()}">${att.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--view" onclick="hrms.viewAttendance('${att.id}')">View</button>
                        <button class="action-btn action-btn--edit" onclick="hrms.editAttendanceRecord('${att.id}')">Edit</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    renderSalaryProcessing() {
        const tbody = document.getElementById('salaryTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.salaryRecords.forEach(sal => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sal.employeeName}</td>
                <td>${sal.month}</td>
                <td>₹${sal.basicSalary.toLocaleString()}</td>
                <td>${sal.daysWorked}/${sal.workingDays}</td>
                <td>₹${sal.grossSalary.toLocaleString()}</td>
                <td>₹${(sal.deductions.pf + sal.deductions.esi + sal.deductions.tds).toLocaleString()}</td>
                <td>₹${sal.netSalary.toLocaleString()}</td>
                <td><span class="status-badge status-badge--${sal.status.toLowerCase()}">${sal.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--view" onclick="hrms.viewSalary('${sal.id}')">View</button>
                        <button class="action-btn action-btn--edit" onclick="hrms.generatePayslip('${sal.id}')">Pay Slip</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    renderLeaveManagement() {
        const tbody = document.getElementById('leaveTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (this.data.leaveApplications.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--color-text-secondary);">No leave applications found</td></tr>';
            return;
        }
        
        this.data.leaveApplications.forEach(leave => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${leave.id}</td>
                <td>${leave.employeeName}</td>
                <td>${leave.leaveType}</td>
                <td>${leave.fromDate}</td>
                <td>${leave.toDate}</td>
                <td>${leave.days}</td>
                <td><span class="status-badge status-badge--${leave.status.toLowerCase().replace(' ', '-')}">${leave.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--view" onclick="hrms.viewLeave('${leave.id}')">View</button>
                        <button class="action-btn action-btn--approve" onclick="hrms.approveLeave('${leave.id}')">Approve</button>
                        <button class="action-btn action-btn--delete" onclick="hrms.rejectLeave('${leave.id}')">Reject</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    renderGrievances() {
        const tbody = document.getElementById('grievanceTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.grievances.forEach(grievance => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${grievance.id}</td>
                <td>${grievance.employeeName}</td>
                <td>${grievance.subject}</td>
                <td><span class="status-badge status-badge--warning">${grievance.priority}</span></td>
                <td><span class="status-badge status-badge--${grievance.status.toLowerCase()}">${grievance.status}</span></td>
                <td>${grievance.submittedDate}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--view" onclick="hrms.viewGrievance('${grievance.id}')">View</button>
                        <button class="action-btn action-btn--edit" onclick="hrms.assignGrievance('${grievance.id}')">Assign</button>
                        <button class="action-btn action-btn--approve" onclick="hrms.resolveGrievance('${grievance.id}')">Resolve</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    renderReferProgram() {
        const campaignsEl = document.getElementById('emailCampaigns');
        if (campaignsEl) {
            campaignsEl.innerHTML = '<p>No campaigns created yet. <button class="btn btn--primary" onclick="hrms.openEmailCampaign()">Create First Campaign</button></p>';
        }
    }
    
    renderRBAC() {
        this.renderRoles();
    }
    
    renderRoles() {
        const tbody = document.getElementById('rolesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.roles.forEach(role => {
            const usersCount = this.users.filter(user => user.roles.includes(role.id)).length;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${role.name}</td>
                <td>${role.description}</td>
                <td>${usersCount}</td>
                <td><span class="status-badge status-badge--${role.status.toLowerCase()}">${role.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--view" onclick="hrms.viewRole('${role.id}')">View</button>
                        <button class="action-btn action-btn--edit" onclick="hrms.editRole('${role.id}')">Edit</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    renderPermissionMatrix() {
        const matrixEl = document.getElementById('permissionMatrix');
        if (!matrixEl) return;
        
        let matrixHtml = `
            <div class="matrix-header">
                <h4>Permission Assignment Matrix</h4>
                <p>Check the boxes to assign permissions to roles</p>
            </div>
            <div class="matrix-grid">
                <div class="matrix-cell matrix-cell--header">Module/Action</div>
        `;
        
        // Header row with role names
        this.roles.forEach(role => {
            matrixHtml += `<div class="matrix-cell matrix-cell--header">${role.name}</div>`;
        });
        
        // Permission rows
        this.config.modules.forEach(module => {
            matrixHtml += `<div class="matrix-cell matrix-cell--header">${module.name}</div>`;
            
            this.roles.forEach(role => {
                const hasPermission = role.permissions.includes('ALL') || 
                                    role.permissions.includes(`${module.id}.all`) ||
                                    role.permissions.some(p => p.startsWith(`${module.id}.`));
                
                matrixHtml += `
                    <div class="matrix-cell">
                        <input type="checkbox" class="matrix-checkbox" 
                               data-role="${role.id}" 
                               data-module="${module.id}" 
                               ${hasPermission ? 'checked' : ''}>
                    </div>
                `;
            });
        });
        
        matrixHtml += '</div>';
        matrixEl.innerHTML = matrixHtml;
    }
    
    renderUserRoles() {
        const tbody = document.getElementById('userRolesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.users.forEach(user => {
            const userRole = this.getUserRole(user);
            const roleName = userRole ? userRole.name : 'No Role';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${roleName}</td>
                <td><span class="status-badge status-badge--${user.status.toLowerCase()}">${user.status}</span></td>
                <td>${new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn--edit" onclick="hrms.editUserRole('${user.id}')">Change Role</button>
                        <button class="action-btn action-btn--view" onclick="hrms.viewUserAccess('${user.id}')">View Access</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    renderAccessLogs() {
        const logsEl = document.getElementById('accessLogs');
        if (logsEl) {
            logsEl.innerHTML = `
                <div class="card">
                    <div class="card__body">
                        <h4>Access Monitoring</h4>
                        <p>Real-time access logs and permission usage tracking will be displayed here.</p>
                        <div class="access-stats">
                            <div class="stat-item">
                                <span class="stat-label">Active Users:</span>
                                <span class="stat-value">${this.users.filter(u => u.status === 'Active').length}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Total Roles:</span>
                                <span class="stat-value">${this.roles.length}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Last Login:</span>
                                <span class="stat-value">${new Date().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // Enhanced Work Order Functions
    openWorkOrderForm(id = null) {
        const isEdit = id !== null;
        const workOrder = isEdit ? this.data.workOrders.find(wo => wo.id === id) : {
            jobOpenings: [{id: 'JO' + Date.now(), positionTitle: '', numberOfOpenings: 1, salary: 0}]
        };
        
        let jobOpeningsHtml = '';
        if (workOrder.jobOpenings) {
            workOrder.jobOpenings.forEach((opening, index) => {
                jobOpeningsHtml += `
                    <div class="job-opening" data-opening-id="${opening.id}">
                        <div class="job-opening-header">
                            <span class="job-opening-title">Job Opening ${index + 1}</span>
                            ${workOrder.jobOpenings.length > 1 ? `<button type="button" class="job-opening-remove" onclick="hrms.removeJobOpening('${opening.id}')">&times;</button>` : ''}
                        </div>
                        <div class="form-grid--two-col">
                            <div class="form-group">
                                <label class="form-label">Position Title</label>
                                <input type="text" class="form-control" name="positionTitle_${opening.id}" value="${opening.positionTitle || ''}" placeholder="Enter position title manually" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Number of Openings</label>
                                <input type="number" class="form-control" name="numberOfOpenings_${opening.id}" value="${opening.numberOfOpenings || 1}" min="1" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Salary per Position (₹)</label>
                                <input type="number" class="form-control" name="salary_${opening.id}" value="${opening.salary || 0}" min="0" placeholder="Enter salary amount" required>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        const formContent = `
            <form id="workOrderForm">
                <div class="form-section">
                    <h4>Client Information</h4>
                    <div class="form-grid--two-col">
                        <div class="form-group">
                            <label class="form-label">Client Name</label>
                            <input type="text" class="form-control" name="clientName" value="${workOrder.clientName || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Client Location</label>
                            <input type="text" class="form-control" name="clientLocation" value="${workOrder.clientLocation || ''}" placeholder="Enter location manually">
                        </div>
                        <div class="form-group">
                            <label class="form-label">SPOC Number</label>
                            <input type="tel" class="form-control" name="spocNumber" value="${workOrder.spocNumber || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">SPOC Email</label>
                            <input type="email" class="form-control" name="spocEmail" value="${workOrder.spocEmail || ''}" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Work Order Details</h4>
                    <div class="form-grid--two-col">
                        <div class="form-group">
                            <label class="form-label">Work Order Type</label>
                            <input type="text" class="form-control" name="workOrderType" value="${workOrder.workOrderType || ''}" placeholder="Enter work order type manually">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Duration From</label>
                            <input type="date" class="form-control" name="durationFrom" value="${workOrder.durationFrom || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Duration To</label>
                            <input type="date" class="form-control" name="durationTo" value="${workOrder.durationTo || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">BG/Security Deposit (₹)</label>
                            <input type="number" class="form-control" name="bgSecurityDeposit" value="${workOrder.bgSecurityDeposit || ''}" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-section job-openings-section">
                    <h4>Job Openings Management</h4>
                    <div id="jobOpeningsContainer">
                        ${jobOpeningsHtml}
                    </div>
                    <button type="button" class="add-job-opening" onclick="hrms.addJobOpening()">
                        <span>+ Add Another Job Opening</span>
                    </button>
                </div>
            </form>
        `;
        
        this.openModal(
            isEdit ? 'Edit Work Order' : 'New Work Order',
            formContent,
            () => this.saveWorkOrder(id)
        );
    }
    
    addJobOpening() {
        const container = document.getElementById('jobOpeningsContainer');
        if (!container) return;
        
        const openingId = 'JO' + Date.now();
        const openingCount = container.querySelectorAll('.job-opening').length + 1;
        
        const newOpening = document.createElement('div');
        newOpening.className = 'job-opening';
        newOpening.dataset.openingId = openingId;
        newOpening.innerHTML = `
            <div class="job-opening-header">
                <span class="job-opening-title">Job Opening ${openingCount}</span>
                <button type="button" class="job-opening-remove" onclick="hrms.removeJobOpening('${openingId}')">&times;</button>
            </div>
            <div class="form-grid--two-col">
                <div class="form-group">
                    <label class="form-label">Position Title</label>
                    <input type="text" class="form-control" name="positionTitle_${openingId}" placeholder="Enter position title manually" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Number of Openings</label>
                    <input type="number" class="form-control" name="numberOfOpenings_${openingId}" value="1" min="1" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Salary per Position (₹)</label>
                    <input type="number" class="form-control" name="salary_${openingId}" min="0" placeholder="Enter salary amount" required>
                </div>
            </div>
        `;
        
        container.appendChild(newOpening);
    }
    
    removeJobOpening(openingId) {
        const opening = document.querySelector(`[data-opening-id="${openingId}"]`);
        if (opening) {
            opening.remove();
            // Update job opening numbers
            const openings = document.querySelectorAll('.job-opening');
            openings.forEach((opening, index) => {
                const title = opening.querySelector('.job-opening-title');
                if (title) title.textContent = `Job Opening ${index + 1}`;
            });
        }
    }
    
    saveWorkOrder(id = null) {
        const form = document.getElementById('workOrderForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = {};
        
        // Get basic form data
        for (let [key, value] of formData.entries()) {
            if (!key.includes('_')) {
                data[key] = value;
            }
        }
        
        // Process job openings
        const jobOpenings = [];
        const openings = document.querySelectorAll('.job-opening');
        
        openings.forEach(openingEl => {
            const openingId = openingEl.dataset.openingId;
            const opening = {
                id: openingId,
                positionTitle: formData.get(`positionTitle_${openingId}`) || '',
                numberOfOpenings: parseInt(formData.get(`numberOfOpenings_${openingId}`)) || 1,
                salary: parseFloat(formData.get(`salary_${openingId}`)) || 0,
                assignedEmployees: []
            };
            
            // If editing, preserve existing assignments
            if (id) {
                const existingWO = this.data.workOrders.find(wo => wo.id === id);
                const existingOpening = existingWO?.jobOpenings?.find(jo => jo.id === openingId);
                if (existingOpening) {
                    opening.assignedEmployees = existingOpening.assignedEmployees || [];
                }
            }
            
            jobOpenings.push(opening);
        });
        
        data.jobOpenings = jobOpenings;
        
        if (id) {
            // Update existing
            const index = this.data.workOrders.findIndex(wo => wo.id === id);
            if (index !== -1) {
                this.data.workOrders[index] = { ...this.data.workOrders[index], ...data };
            }
        } else {
            // Create new
            data.id = 'WO' + String(this.data.workOrders.length + 1).padStart(3, '0');
            data.workOrderNumber = 'WO-2024-' + String(this.data.workOrders.length + 1).padStart(3, '0');
            data.status = 'Active';
            data.createdDate = new Date().toISOString().split('T')[0];
            data.createdBy = this.currentUser?.id || 'USER001';
            this.data.workOrders.push(data);
        }
        
        this.closeModal();
        this.renderWorkOrders();
        this.updateDashboardStats();
        this.showSuccessMessage(id ? 'Work Order updated successfully!' : 'Work Order created successfully!');
    }
    
    // Enhanced Employee Functions
    openEmployeeForm(id = null) {
        const isEdit = id !== null;
        const employee = isEdit ? this.data.employees.find(emp => emp.id === id) : {};
        
        const formContent = `
            <form id="employeeForm">
                <div class="form-section">
                    <h4>Personal Information</h4>
                    <div class="form-grid--two-col">
                        <div class="form-group">
                            <label class="form-label">First Name</label>
                            <input type="text" class="form-control" name="firstName" value="${employee.firstName || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Middle Name</label>
                            <input type="text" class="form-control" name="middleName" value="${employee.middleName || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Last Name</label>
                            <input type="text" class="form-control" name="lastName" value="${employee.lastName || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Number</label>
                            <input type="tel" class="form-control" name="contactNumber" value="${employee.contactNumber || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email ID</label>
                            <input type="email" class="form-control" name="email" value="${employee.email || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Location</label>
                            <input type="text" class="form-control" name="location" value="${employee.location || ''}" placeholder="Enter location manually">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Position Applied</label>
                            <input type="text" class="form-control" name="positionApplied" value="${employee.positionApplied || ''}" placeholder="Enter position manually">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Experience</label>
                            <input type="text" class="form-control" name="experience" value="${employee.experience || ''}" placeholder="e.g., 5 years" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Financial Details</h4>
                    <div class="form-grid--two-col">
                        <div class="form-group">
                            <label class="form-label">Account Number</label>
                            <input type="text" class="form-control" name="accountNumber" value="${employee.accountNumber || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">IFSC Code</label>
                            <input type="text" class="form-control" name="ifscCode" value="${employee.ifscCode || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">UAN Number</label>
                            <input type="text" class="form-control" name="uanNumber" value="${employee.uanNumber || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">ESIC Number</label>
                            <input type="text" class="form-control" name="esicNumber" value="${employee.esicNumber || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Salary (₹)</label>
                            <input type="number" class="form-control" name="salary" value="${employee.salary || ''}" min="0">
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>References</h4>
                    <div class="form-grid--two-col">
                        <div class="form-group">
                            <label class="form-label">Reference 1 Name</label>
                            <input type="text" class="form-control" name="reference1Name" value="${employee.reference1?.name || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reference 1 Mobile</label>
                            <input type="tel" class="form-control" name="reference1Mobile" value="${employee.reference1?.mobile || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reference 2 Name</label>
                            <input type="text" class="form-control" name="reference2Name" value="${employee.reference2?.name || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reference 2 Mobile</label>
                            <input type="tel" class="form-control" name="reference2Mobile" value="${employee.reference2?.mobile || ''}">
                        </div>
                    </div>
                </div>
            </form>
        `;
        
        this.openModal(
            isEdit ? 'Edit Employee' : 'Add New Employee',
            formContent,
            () => this.saveEmployee(id)
        );
    }
    
    saveEmployee(id = null) {
        const form = document.getElementById('employeeForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Process references
        data.reference1 = {
            name: data.reference1Name || '',
            mobile: data.reference1Mobile || ''
        };
        data.reference2 = {
            name: data.reference2Name || '',
            mobile: data.reference2Mobile || ''
        };
        delete data.reference1Name;
        delete data.reference1Mobile;
        delete data.reference2Name;
        delete data.reference2Mobile;
        
        if (id) {
            // Update existing
            const index = this.data.employees.findIndex(emp => emp.id === id);
            if (index !== -1) {
                this.data.employees[index] = { ...this.data.employees[index], ...data };
            }
        } else {
            // Create new
            data.id = 'EMP' + String(this.data.employees.length + 1).padStart(3, '0');
            data.status = 'Active';
            data.joiningDate = new Date().toISOString().split('T')[0];
            data.positionRole = data.positionApplied;
            data.policeVerification = 'Pending';
            data.declaration = 'Pending';
            data.workOrderAssignments = [];
            this.data.employees.push(data);
        }
        
        this.closeModal();
        this.renderEmployees();
        this.updateDashboardStats();
        this.showSuccessMessage(id ? 'Employee updated successfully!' : 'Employee added successfully!');
    }
    
    // Bulk Import Functions
    openBulkImportModal() {
        const formContent = `
            <div class="bulk-import-section">
                <h4>Bulk Employee Import</h4>
                <p>Upload an Excel file with employee information to import multiple employees at once.</p>
                
                <div class="bulk-import-area" id="dropZone">
                    <div style="margin-bottom: var(--space-16);">
                        <h5>Drag & Drop Excel File Here</h5>
                        <p>or</p>
                        <label for="excelFile" class="file-input-label">Choose Excel File</label>
                        <input type="file" id="excelFile" class="file-input" accept=".xlsx,.xls" onchange="hrms.handleFileSelect(event)">
                    </div>
                    <div id="fileInfo" style="display: none;">
                        <p><strong>Selected File:</strong> <span id="fileName"></span></p>
                        <p><strong>Size:</strong> <span id="fileSize"></span></p>
                    </div>
                </div>
                
                <div style="margin-top: var(--space-20);">
                    <h5>Template Format</h5>
                    <p>Your Excel file should contain the following columns:</p>
                    <div class="template-columns">
                        ${this.config.excelTemplate.columns.map(col => `<span class="status-badge status-badge--info">${col}</span>`).join(' ')}
                    </div>
                </div>
                
                <div id="importPreview" class="hidden" style="margin-top: var(--space-20);">
                    <h5>Import Preview</h5>
                    <div id="previewContent"></div>
                    <div id="importErrors" class="hidden" style="color: var(--color-error); margin-top: var(--space-12);"></div>
                </div>
            </div>
        `;
        
        this.openModal(
            'Bulk Import Employees',
            formContent,
            () => this.processBulkImport()
        );
        
        // Set up drag and drop
        setTimeout(() => {
            const dropZone = document.getElementById('dropZone');
            if (dropZone) {
                dropZone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    dropZone.classList.add('dragover');
                });
                
                dropZone.addEventListener('dragleave', () => {
                    dropZone.classList.remove('dragover');
                });
                
                dropZone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dropZone.classList.remove('dragover');
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                        this.processExcelFile(files[0]);
                    }
                });
            }
        }, 100);
    }
    
    downloadTemplate() {
        // Generate CSV template
        const csvContent = this.config.excelTemplate.columns.join(',') + '\n' + 
                          'John Doe,+91 9876543210,john@example.com,Mumbai,Software Engineer,Developer,3 years,1234567890,HDFC0001234,123456789012,9876543210,Reference 1,+91 9876543211,Reference 2,+91 9876543212,Pending,Pending';
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employee_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.showSuccessMessage('Template downloaded successfully!');
    }
    
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.processExcelFile(file);
        }
    }
    
    processExcelFile(file) {
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        
        if (fileInfo && fileName && fileSize) {
            fileName.textContent = file.name;
            fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
            fileInfo.style.display = 'block';
        }
        
        // Simulate file processing (in real app, would use a library like SheetJS)
        setTimeout(() => {
            this.showImportPreview([
                {
                    'Employee Name': 'Jane Smith',
                    'Contact Number': '+91 9876543220',
                    'Email ID': 'jane@example.com',
                    'Location': 'Delhi',
                    'Position Applied': 'Frontend Developer',
                    'Experience': '4 years'
                },
                {
                    'Employee Name': 'Mike Johnson',
                    'Contact Number': '+91 9876543221',
                    'Email ID': 'mike@example.com',
                    'Location': 'Bangalore',
                    'Position Applied': 'Backend Developer',
                    'Experience': '6 years'
                }
            ]);
        }, 1500);
    }
    
    showImportPreview(data) {
        const previewDiv = document.getElementById('importPreview');
        const contentDiv = document.getElementById('previewContent');
        
        if (previewDiv && contentDiv) {
            let previewHtml = `
                <p><strong>Found ${data.length} employees to import:</strong></p>
                <div class="data-table" style="max-height: 300px; overflow-y: auto;">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Position</th>
                                <th>Experience</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            data.forEach(row => {
                previewHtml += `
                    <tr>
                        <td>${row['Employee Name'] || ''}</td>
                        <td>${row['Contact Number'] || ''}</td>
                        <td>${row['Email ID'] || ''}</td>
                        <td>${row['Location'] || ''}</td>
                        <td>${row['Position Applied'] || ''}</td>
                        <td>${row['Experience'] || ''}</td>
                    </tr>
                `;
            });
            
            previewHtml += '</tbody></table></div>';
            contentDiv.innerHTML = previewHtml;
            previewDiv.classList.remove('hidden');
        }
    }
    
    processBulkImport() {
        // Simulate bulk import processing
        const mockEmployees = [
            {
                firstName: 'Jane',
                lastName: 'Smith',
                contactNumber: '+91 9876543220',
                email: 'jane@example.com',
                location: 'Delhi',
                positionApplied: 'Frontend Developer',
                experience: '4 years'
            },
            {
                firstName: 'Mike',
                lastName: 'Johnson', 
                contactNumber: '+91 9876543221',
                email: 'mike@example.com',
                location: 'Bangalore',
                positionApplied: 'Backend Developer',
                experience: '6 years'
            }
        ];
        
        mockEmployees.forEach((emp, index) => {
            const newEmployee = {
                id: 'EMP' + String(this.data.employees.length + index + 1).padStart(3, '0'),
                firstName: emp.firstName,
                middleName: '',
                lastName: emp.lastName,
                contactNumber: emp.contactNumber,
                email: emp.email,
                location: emp.location,
                positionApplied: emp.positionApplied,
                positionRole: emp.positionApplied,
                experience: emp.experience,
                accountNumber: '',
                ifscCode: '',
                uanNumber: '',
                esicNumber: '',
                reference1: {name: '', mobile: ''},
                reference2: {name: '', mobile: ''},
                policeVerification: 'Pending',
                declaration: 'Pending',
                status: 'Active',
                joiningDate: new Date().toISOString().split('T')[0],
                workOrderAssignments: []
            };
            
            this.data.employees.push(newEmployee);
        });
        
        this.closeModal();
        this.renderEmployees();
        this.updateDashboardStats();
        this.showSuccessMessage(`Successfully imported ${mockEmployees.length} employees!`);
    }
    
    // Attendance Calculator - FIXED: Complete implementation
    openAttendanceCalculator() {
        const formContent = `
            <form id="attendanceForm">
                <div class="form-section">
                    <h4>Monthly Attendance Calculator</h4>
                    <div class="attendance-form">
                        <div class="form-group">
                            <label class="form-label">Employee</label>
                            <select class="form-control" name="employeeId" required>
                                <option value="">Select Employee</option>
                                ${this.data.employees.filter(emp => emp.status === 'Active').map(emp => 
                                    `<option value="${emp.id}">${emp.firstName} ${emp.lastName}</option>`
                                ).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Month & Year</label>
                            <input type="month" class="form-control" name="month" value="${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Days Worked</label>
                            <div class="days-counter">
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysWorked', -1)">-</button>
                                <span class="counter-value" id="daysWorkedValue">0</span>
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysWorked', 1)">+</button>
                            </div>
                            <input type="hidden" name="daysWorked" id="daysWorked" value="0">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Days Absent</label>
                            <div class="days-counter">
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysAbsent', -1)">-</button>
                                <span class="counter-value" id="daysAbsentValue">0</span>
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysAbsent', 1)">+</button>
                            </div>
                            <input type="hidden" name="daysAbsent" id="daysAbsent" value="0">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Holidays</label>
                            <div class="days-counter">
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('holidays', -1)">-</button>
                                <span class="counter-value" id="holidaysValue">4</span>
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('holidays', 1)">+</button>
                            </div>
                            <input type="hidden" name="holidays" id="holidays" value="4">
                        </div>
                    </div>
                    
                    <div class="total-calculator">
                        <h5>Calculation Summary</h5>
                        <div class="stat-item">
                            <span class="stat-label">Total Days in Month:</span>
                            <span class="stat-value" id="totalDaysDisplay">30</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Working Days:</span>
                            <span class="stat-value" id="workingDaysDisplay">26</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Attendance Percentage:</span>
                            <span class="stat-value" id="attendancePercentage">0%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Sum Total:</span>
                            <span class="stat-value" id="sumTotal">4</span>
                        </div>
                    </div>
                </div>
            </form>
        `;
        
        this.openModal(
            'Monthly Attendance Calculator',
            formContent,
            () => this.saveAttendance()
        );
        
        // Initialize counters
        setTimeout(() => this.updateCalculation(), 100);
    }
    
    updateCounter(field, increment) {
        const valueElement = document.getElementById(field + 'Value');
        const hiddenInput = document.getElementById(field);
        
        if (valueElement && hiddenInput) {
            let currentValue = parseInt(valueElement.textContent) || 0;
            currentValue = Math.max(0, currentValue + increment);
            
            valueElement.textContent = currentValue;
            hiddenInput.value = currentValue;
            
            this.updateCalculation();
        }
    }
    
    updateCalculation() {
        const daysWorked = parseInt(document.getElementById('daysWorked')?.value) || 0;
        const daysAbsent = parseInt(document.getElementById('daysAbsent')?.value) || 0;
        const holidays = parseInt(document.getElementById('holidays')?.value) || 4;
        
        const totalDays = 30; // Simplified for demo
        const workingDays = totalDays - holidays;
        const sumTotal = daysWorked + daysAbsent + holidays;
        const attendancePercentage = workingDays > 0 ? Math.round((daysWorked / workingDays) * 100) : 0;
        
        const totalDaysEl = document.getElementById('totalDaysDisplay');
        const workingDaysEl = document.getElementById('workingDaysDisplay');
        const attendancePercentageEl = document.getElementById('attendancePercentage');
        const sumTotalEl = document.getElementById('sumTotal');
        
        if (totalDaysEl) totalDaysEl.textContent = totalDays;
        if (workingDaysEl) workingDaysEl.textContent = workingDays;
        if (attendancePercentageEl) attendancePercentageEl.textContent = attendancePercentage + '%';
        if (sumTotalEl) sumTotalEl.textContent = sumTotal;
        
        // Validation styling
        if (sumTotal === totalDays) {
            if (sumTotalEl) sumTotalEl.style.color = 'var(--color-success)';
        } else {
            if (sumTotalEl) sumTotalEl.style.color = 'var(--color-error)';
        }
    }
    
    saveAttendance() {
        const form = document.getElementById('attendanceForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        const employee = this.data.employees.find(emp => emp.id === data.employeeId);
        if (!employee) return;
        
        // Validate total
        const totalDays = 30;
        const sumTotal = parseInt(data.daysWorked) + parseInt(data.daysAbsent) + parseInt(data.holidays);
        
        if (sumTotal !== totalDays) {
            this.showErrorMessage(`Total days (${sumTotal}) must equal ${totalDays}!`);
            return;
        }
        
        const attendanceRecord = {
            id: 'ATT' + String(this.data.attendance.length + 1).padStart(3, '0'),
            employeeId: data.employeeId,
            employeeName: `${employee.firstName} ${employee.lastName}`,
            month: data.month,
            year: parseInt(data.month.split('-')[0]),
            daysWorked: parseInt(data.daysWorked),
            daysAbsent: parseInt(data.daysAbsent),
            holidays: parseInt(data.holidays),
            totalDays: totalDays,
            workingDaysInMonth: totalDays - parseInt(data.holidays),
            status: 'Submitted',
            submittedBy: this.currentUser?.id || 'USER001',
            submittedDate: new Date().toISOString().split('T')[0]
        };
        
        this.data.attendance.push(attendanceRecord);
        
        this.closeModal();
        this.renderAttendanceManagement();
        this.showSuccessMessage('Attendance record saved successfully!');
    }
    
    // FIXED: Edit Attendance Record
    editAttendanceRecord(id) {
        const attendanceRecord = this.data.attendance.find(att => att.id === id);
        if (!attendanceRecord) return;
        
        const formContent = `
            <form id="attendanceEditForm">
                <div class="form-section">
                    <h4>Edit Attendance Record</h4>
                    <div class="attendance-form">
                        <div class="form-group">
                            <label class="form-label">Employee</label>
                            <input type="text" class="form-control" value="${attendanceRecord.employeeName}" readonly>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Month & Year</label>
                            <input type="month" class="form-control" name="month" value="${attendanceRecord.month}" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Days Worked</label>
                            <div class="days-counter">
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysWorked', -1)">-</button>
                                <span class="counter-value" id="daysWorkedValue">${attendanceRecord.daysWorked}</span>
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysWorked', 1)">+</button>
                            </div>
                            <input type="hidden" name="daysWorked" id="daysWorked" value="${attendanceRecord.daysWorked}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Days Absent</label>
                            <div class="days-counter">
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysAbsent', -1)">-</button>
                                <span class="counter-value" id="daysAbsentValue">${attendanceRecord.daysAbsent}</span>
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('daysAbsent', 1)">+</button>
                            </div>
                            <input type="hidden" name="daysAbsent" id="daysAbsent" value="${attendanceRecord.daysAbsent}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Holidays</label>
                            <div class="days-counter">
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('holidays', -1)">-</button>
                                <span class="counter-value" id="holidaysValue">${attendanceRecord.holidays}</span>
                                <button type="button" class="counter-btn" onclick="hrms.updateCounter('holidays', 1)">+</button>
                            </div>
                            <input type="hidden" name="holidays" id="holidays" value="${attendanceRecord.holidays}">
                        </div>
                    </div>
                    
                    <div class="total-calculator">
                        <h5>Calculation Summary</h5>
                        <div class="stat-item">
                            <span class="stat-label">Total Days in Month:</span>
                            <span class="stat-value" id="totalDaysDisplay">${attendanceRecord.totalDays}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Working Days:</span>
                            <span class="stat-value" id="workingDaysDisplay">${attendanceRecord.workingDaysInMonth}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Attendance Percentage:</span>
                            <span class="stat-value" id="attendancePercentage">${Math.round((attendanceRecord.daysWorked / attendanceRecord.workingDaysInMonth) * 100)}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Sum Total:</span>
                            <span class="stat-value" id="sumTotal">${attendanceRecord.daysWorked + attendanceRecord.daysAbsent + attendanceRecord.holidays}</span>
                        </div>
                    </div>
                </div>
            </form>
        `;
        
        this.openModal(
            'Edit Attendance Record',
            formContent,
            () => this.saveAttendanceEdit(id)
        );
        
        // Initialize counters with current values
        setTimeout(() => this.updateCalculation(), 100);
    }
    
    saveAttendanceEdit(id) {
        const form = document.getElementById('attendanceEditForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validate total
        const totalDays = 30;
        const sumTotal = parseInt(data.daysWorked) + parseInt(data.daysAbsent) + parseInt(data.holidays);
        
        if (sumTotal !== totalDays) {
            this.showErrorMessage(`Total days (${sumTotal}) must equal ${totalDays}!`);
            return;
        }
        
        // Update the attendance record
        const index = this.data.attendance.findIndex(att => att.id === id);
        if (index !== -1) {
            this.data.attendance[index] = {
                ...this.data.attendance[index],
                month: data.month,
                year: parseInt(data.month.split('-')[0]),
                daysWorked: parseInt(data.daysWorked),
                daysAbsent: parseInt(data.daysAbsent),
                holidays: parseInt(data.holidays),
                totalDays: totalDays,
                workingDaysInMonth: totalDays - parseInt(data.holidays),
                status: 'Updated'
            };
        }
        
        this.closeModal();
        this.renderAttendanceManagement();
        this.showSuccessMessage('Attendance record updated successfully!');
    }
    
    // Salary Processing with Attendance Integration
    processMonthlySalary() {
        let processedCount = 0;
        
        this.data.employees.forEach(employee => {
            const attendanceRecord = this.data.attendance.find(att => 
                att.employeeId === employee.id && 
                att.month === '2024-09' && 
                att.status === 'Submitted'
            );
            
            if (attendanceRecord && employee.salary) {
                const basicSalary = employee.salary;
                const daysWorked = attendanceRecord.daysWorked;
                const workingDays = attendanceRecord.workingDaysInMonth;
                
                // Calculate pro-rated salary
                const grossSalary = (basicSalary / workingDays) * daysWorked;
                
                // Calculate deductions
                const pf = grossSalary * 0.12;
                const esi = grossSalary * 0.01;
                const tds = grossSalary * 0.05; // Simplified
                
                const netSalary = grossSalary - pf - esi - tds;
                
                const salaryRecord = {
                    id: 'SAL' + String(this.data.salaryRecords.length + processedCount + 1).padStart(3, '0'),
                    employeeId: employee.id,
                    employeeName: `${employee.firstName} ${employee.lastName}`,
                    month: '2024-09',
                    year: 2024,
                    basicSalary: basicSalary,
                    daysWorked: daysWorked,
                    workingDays: workingDays,
                    grossSalary: Math.round(grossSalary * 100) / 100,
                    deductions: {
                        pf: Math.round(pf * 100) / 100,
                        esi: Math.round(esi * 100) / 100,
                        tds: Math.round(tds * 100) / 100
                    },
                    netSalary: Math.round(netSalary * 100) / 100,
                    status: 'Processed',
                    processedBy: this.currentUser?.id || 'USER001',
                    processedDate: new Date().toISOString().split('T')[0]
                };
                
                // Check if record already exists
                const existingIndex = this.data.salaryRecords.findIndex(sal => 
                    sal.employeeId === employee.id && sal.month === '2024-09'
                );
                
                if (existingIndex === -1) {
                    this.data.salaryRecords.push(salaryRecord);
                    processedCount++;
                }
            }
        });
        
        this.renderSalaryProcessing();
        this.showSuccessMessage(`Salary processed for ${processedCount} employees!`);
    }
    
    // Professional Document Generation
    generateDocumentType(type) {
        const formContent = `
            <form id="documentForm" class="form-grid--two-col">
                <div class="form-group">
                    <label class="form-label">Employee</label>
                    <select class="form-control" name="employeeId" required>
                        <option value="">Select Employee</option>
                        ${this.data.employees.filter(emp => emp.status === 'Active').map(emp => 
                            `<option value="${emp.id}">${emp.firstName} ${emp.lastName}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Document Type</label>
                    <input type="text" class="form-control" value="${type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}" readonly>
                </div>
                ${type === 'payslip' ? `
                    <div class="form-group">
                        <label class="form-label">Month</label>
                        <input type="month" class="form-control" name="month" required>
                    </div>
                ` : ''}
                ${type === 'increment-letter' ? `
                    <div class="form-group">
                        <label class="form-label">New Salary Amount (₹)</label>
                        <input type="number" class="form-control" name="newSalary" placeholder="Enter new salary amount" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Effective Date</label>
                        <input type="date" class="form-control" name="effectiveDate" required>
                    </div>
                ` : ''}
                ${type === 'offer-letter' ? `
                    <div class="form-group">
                        <label class="form-label">Position</label>
                        <input type="text" class="form-control" name="position" placeholder="Job position">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Joining Date</label>
                        <input type="date" class="form-control" name="joiningDate">
                    </div>
                ` : ''}
            </form>
        `;
        
        this.openModal(`Generate ${type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`, formContent, () => this.saveDocument(type));
    }
    
    saveDocument(type) {
        const form = document.getElementById('documentForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        const employee = this.data.employees.find(emp => emp.id === data.employeeId);
        if (!employee) return;
        
        const document = {
            id: 'DOC' + String(this.data.documents.length + 1).padStart(3, '0'),
            employeeId: data.employeeId,
            employeeName: `${employee.firstName} ${employee.lastName}`,
            type: type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            generatedDate: new Date().toISOString().split('T')[0],
            status: 'Generated',
            generatedBy: this.currentUser?.id || 'USER001',
            metadata: {
                month: data.month,
                newSalary: data.newSalary,
                effectiveDate: data.effectiveDate,
                position: data.position,
                joiningDate: data.joiningDate
            }
        };
        
        this.data.documents.push(document);
        
        this.closeModal();
        this.renderOnboarding();
        this.showSuccessMessage(`${document.type} generated successfully for ${employee.firstName} ${employee.lastName}!`);
    }
    
    // Modal Management
    openModal(title, content, submitCallback) {
        const modal = document.getElementById('formModal');
        const titleEl = document.getElementById('modalTitle');
        const bodyEl = document.getElementById('modalBody');
        
        if (modal && titleEl && bodyEl) {
            titleEl.textContent = title;
            bodyEl.innerHTML = content;
            modal.classList.remove('hidden');
            this.currentSubmitCallback = submitCallback;
        }
    }
    
    closeModal() {
        const modal = document.getElementById('formModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentSubmitCallback = null;
    }
    
    openViewModal(title, content, actionText = '', actionCallback = null) {
        const modal = document.getElementById('viewModal');
        const titleEl = document.getElementById('viewModalTitle');
        const bodyEl = document.getElementById('viewModalBody');
        const actionBtn = document.getElementById('viewModalActionBtn');
        
        if (modal && titleEl && bodyEl && actionBtn) {
            titleEl.textContent = title;
            bodyEl.innerHTML = content;
            
            if (actionText && actionCallback) {
                actionBtn.textContent = actionText;
                actionBtn.style.display = 'block';
                actionBtn.onclick = actionCallback;
            } else {
                actionBtn.style.display = 'none';
            }
            
            modal.classList.remove('hidden');
        }
    }
    
    closeViewModal() {
        const modal = document.getElementById('viewModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    submitForm() {
        if (this.currentSubmitCallback) {
            this.currentSubmitCallback();
        }
    }
    
    // Utility Functions
    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification--success';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
    
    showErrorMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification--error';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
    
    // Placeholder functions for remaining features
    viewWorkOrder(id) { this.showSuccessMessage('View Work Order feature implementation pending.'); }
    editWorkOrder(id) { this.openWorkOrderForm(id); }
    manageAssignments(id) { this.showSuccessMessage('Assignment management feature implementation pending.'); }
    viewEmployee(id) { this.showSuccessMessage('View Employee feature implementation pending.'); }
    editEmployee(id) { this.openEmployeeForm(id); }
    assignToWorkOrder(id) { this.showSuccessMessage('Work Order assignment feature implementation pending.'); }
    viewAttendance(id) { this.showSuccessMessage('View Attendance feature implementation pending.'); }
    editAttendance(id) { this.editAttendanceRecord(id); }
    viewSalary(id) { this.showSuccessMessage('View Salary feature implementation pending.'); }
    generatePayslip(id) { this.generateDocumentType('payslip'); }
    openLeaveForm() { this.showSuccessMessage('Leave form feature implementation pending.'); }
    openGrievanceForm() { this.showSuccessMessage('Grievance form feature implementation pending.'); }
    viewGrievance(id) { this.showSuccessMessage('View Grievance feature implementation pending.'); }
    assignGrievance(id) { this.showSuccessMessage('Assign Grievance feature implementation pending.'); }
    resolveGrievance(id) { this.showSuccessMessage('Resolve Grievance feature implementation pending.'); }
    openEmailCampaign() { this.showSuccessMessage('Email Campaign feature implementation pending.'); }
    manageTemplates() { this.showSuccessMessage('Template Management feature implementation pending.'); }
    sendBulkEmail() { this.showSuccessMessage('Bulk Email feature implementation pending.'); }
    trackDelivery() { this.showSuccessMessage('Delivery Tracking feature implementation pending.'); }
    generateReport() { this.showSuccessMessage('Report Generation feature implementation pending.'); }
    exportData() { this.showSuccessMessage('Data Export feature implementation pending.'); }
    viewReport(type) { this.showSuccessMessage(`${type} Report feature implementation pending.`); }
    openDocumentGenerationModal() { this.showSuccessMessage('Please select a specific document type to generate.'); }
    openRoleForm() { this.showSuccessMessage('Role Creation feature implementation pending.'); }
    openUserRoleForm() { this.showSuccessMessage('User Role Assignment feature implementation pending.'); }
    viewRole(id) { this.showSuccessMessage('View Role feature implementation pending.'); }
    editRole(id) { this.showSuccessMessage('Edit Role feature implementation pending.'); }
    editUserRole(id) { this.showSuccessMessage('Edit User Role feature implementation pending.'); }
    viewUserAccess(id) { this.showSuccessMessage('View User Access feature implementation pending.'); }
    viewLeave(id) { this.showSuccessMessage('View Leave feature implementation pending.'); }
    approveLeave(id) { this.showSuccessMessage('Approve Leave feature implementation pending.'); }
    rejectLeave(id) { this.showSuccessMessage('Reject Leave feature implementation pending.'); }
}

// Global functions for onclick handlers
function logout() { if (window.hrms) window.hrms.logout(); }
function openWorkOrderForm() { if (window.hrms) window.hrms.openWorkOrderForm(); }
function openEmployeeForm() { if (window.hrms) window.hrms.openEmployeeForm(); }
function openBulkImportModal() { if (window.hrms) window.hrms.openBulkImportModal(); }
function downloadTemplate() { if (window.hrms) window.hrms.downloadTemplate(); }
function openAttendanceCalculator() { if (window.hrms) window.hrms.openAttendanceCalculator(); }
function processMonthlySalary() { if (window.hrms) window.hrms.processMonthlySalary(); }
function openLeaveForm() { if (window.hrms) window.hrms.openLeaveForm(); }
function openGrievanceForm() { if (window.hrms) window.hrms.openGrievanceForm(); }
function closeModal() { if (window.hrms) window.hrms.closeModal(); }
function closeViewModal() { if (window.hrms) window.hrms.closeViewModal(); }
function submitForm() { if (window.hrms) window.hrms.submitForm(); }
function generateDocumentType(type) { if (window.hrms) window.hrms.generateDocumentType(type); }
function openEmailCampaign() { if (window.hrms) window.hrms.openEmailCampaign(); }
function manageTemplates() { if (window.hrms) window.hrms.manageTemplates(); }
function sendBulkEmail() { if (window.hrms) window.hrms.sendBulkEmail(); }
function trackDelivery() { if (window.hrms) window.hrms.trackDelivery(); }
function generateReport() { if (window.hrms) window.hrms.generateReport(); }
function exportData() { if (window.hrms) window.hrms.exportData(); }
function viewReport(type) { if (window.hrms) window.hrms.viewReport(type); }
function performViewAction() { if (window.hrms) window.hrms.performViewAction(); }
function openDocumentGenerationModal() { if (window.hrms) window.hrms.openDocumentGenerationModal(); }
function openRoleForm() { if (window.hrms) window.hrms.openRoleForm(); }
function openUserRoleForm() { if (window.hrms) window.hrms.openUserRoleForm(); }

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.hrms = new HRMSApp();
});