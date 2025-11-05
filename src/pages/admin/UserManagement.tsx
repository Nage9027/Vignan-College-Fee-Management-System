import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Ban } from "lucide-react";
import { toast } from "sonner";

/* ================================
   Types
================================== */
type Role = "Admin" | "Principal" | "Cashier";
type AccountStatus = "Active" | "Deactivated";
type LoginStatus = "Online" | "Offline";

type UserRow = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  gender: string;
  dateOfBirth: string; // yyyy-mm-dd
  address: string;
  role: Role;
  accountStatus: AccountStatus;
  loginStatus: LoginStatus;
  lastLogin: string; // ISO
  createdDate: string; // ISO
};

/* ================================
   Helpers
================================== */
const fmtDateTime = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const roleBadgeClass = (role: Role) => {
  switch (role) {
    case "Admin":
      return "bg-indigo-600 text-white hover:bg-indigo-600";
    case "Principal":
      return "bg-orange-500 text-white hover:bg-orange-500";
    case "Cashier":
      return "bg-teal-600 text-white hover:bg-teal-600";
  }
};

const accountStatusBadgeClass = (status: AccountStatus) =>
  status === "Active"
    ? "bg-blue-600 text-white hover:bg-blue-600"
    : "bg-muted text-foreground hover:bg-muted";

const loginStatusBadgeClass = (status: LoginStatus) =>
  status === "Online"
    ? "bg-green-600 text-white hover:bg-green-600"
    : "bg-red-600 text-white hover:bg-red-600";

const TH = "text-left p-3 font-semibold text-sm text-muted-foreground";
const TD = "p-3 align-middle";

/* ================================
   Seed Data (replace with API)
================================== */
const seedUsers: UserRow[] = [
  {
    id: "1",
    username: "admin",
    firstName: "System",
    lastName: "Admin",
    fullName: "System Admin",
    fatherName: "N/A",
    motherName: "N/A",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    address: "Head Office",
    role: "Admin",
    accountStatus: "Active",
    loginStatus: "Online",
    lastLogin: "2025-11-04T10:18:00Z",
    createdDate: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    username: "principal",
    firstName: "Rajesh",
    lastName: "Kumar",
    fullName: "Dr. Rajesh Kumar",
    fatherName: "Sri Narayana",
    motherName: "Smt. Anasuya",
    gender: "Male",
    dateOfBirth: "1980-03-15",
    address: "Vijayawada",
    role: "Principal",
    accountStatus: "Active",
    loginStatus: "Offline",
    lastLogin: "2025-11-01T07:42:00Z",
    createdDate: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    username: "cashier",
    firstName: "Priya",
    lastName: "Sharma",
    fullName: "Priya Sharma",
    fatherName: "Mr. Sharma",
    motherName: "Mrs. Sharma",
    gender: "Female",
    dateOfBirth: "1996-06-22",
    address: "Guntur",
    role: "Cashier",
    accountStatus: "Active",
    loginStatus: "Online",
    lastLogin: "2025-11-05T07:55:00Z",
    createdDate: "2024-02-01T00:00:00Z",
  },
];

/* ================================
   Component
================================== */
const UserManagement = () => {
  const [users, setUsers] = useState<UserRow[]>(seedUsers);

  /* ---------- Create User state ---------- */
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Personal Info
  const [cuFirstName, setCuFirstName] = useState("");
  const [cuLastName, setCuLastName] = useState("");
  const [cuFatherName, setCuFatherName] = useState("");
  const [cuMotherName, setCuMotherName] = useState("");
  const [cuGender, setCuGender] = useState(""); // Male, Female, Other
  const [cuDOB, setCuDOB] = useState(""); // yyyy-mm-dd
  const [cuAddress, setCuAddress] = useState("");

  // Login
  const [cuUsername, setCuUsername] = useState("");
  const [cuPassword, setCuPassword] = useState("");
  const [cuConfirmPassword, setCuConfirmPassword] = useState("");

  // Role
  const [cuRole, setCuRole] = useState<Role | "">("");

  const canCreate = useMemo(() => {
    return (
      cuFirstName.trim() &&
      cuLastName.trim() &&
      cuFatherName.trim() &&
      cuMotherName.trim() &&
      cuGender.trim() &&
      cuDOB.trim() &&
      cuAddress.trim() &&
      cuUsername.trim() &&
      cuPassword.trim() &&
      cuConfirmPassword.trim() &&
      cuRole &&
      cuPassword === cuConfirmPassword
    );
  }, [
    cuFirstName,
    cuLastName,
    cuFatherName,
    cuMotherName,
    cuGender,
    cuDOB,
    cuAddress,
    cuUsername,
    cuPassword,
    cuConfirmPassword,
    cuRole,
  ]);

  const handleCreateUser = () => {
    if (cuPassword !== cuConfirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    const fullName = `${cuFirstName} ${cuLastName}`.trim();

    const newUser: UserRow = {
      id: crypto.randomUUID(),
      username: cuUsername.trim(),
      firstName: cuFirstName.trim(),
      lastName: cuLastName.trim(),
      fullName,
      fatherName: cuFatherName.trim(),
      motherName: cuMotherName.trim(),
      gender: cuGender.trim(),
      dateOfBirth: cuDOB.trim(),
      address: cuAddress.trim(),
      role: cuRole as Role,
      accountStatus: "Active",
      loginStatus: "Offline",
      lastLogin: new Date().toISOString(),
      createdDate: new Date().toISOString(),
    };

    setUsers((prev) => [newUser, ...prev]);
    toast.success("User created successfully");

    // Reset fields
    setShowCreateModal(false);
    setCuFirstName("");
    setCuLastName("");
    setCuFatherName("");
    setCuMotherName("");
    setCuGender("");
    setCuDOB("");
    setCuAddress("");
    setCuUsername("");
    setCuPassword("");
    setCuConfirmPassword("");
    setCuRole("");
  };

  /* ---------- Edit User state ---------- */
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [eName, setEName] = useState("");
  const [eRole, setERole] = useState<Role | "">("");
  const [eAccountActive, setEAccountActive] = useState(true);
  const [eShowReset, setEShowReset] = useState(false);
  const [eNewPassword, setENewPassword] = useState("");

  const currentEditingUser = useMemo(
    () => users.find((u) => u.id === editUserId) || null,
    [users, editUserId]
  );

  const openEdit = (u: UserRow) => {
    setEditUserId(u.id);
    setEName(u.fullName);
    setERole(u.role);
    setEAccountActive(u.accountStatus === "Active");
    setEShowReset(false);
    setENewPassword("");
    setShowEditModal(true);
  };

  const hasEditChanges = useMemo(() => {
    if (!currentEditingUser) return false;
    const roleChanged = eRole !== currentEditingUser.role;
    const nameChanged = eName.trim() !== currentEditingUser.fullName;
    const accChanged =
      (eAccountActive ? "Active" : "Deactivated") !==
      currentEditingUser.accountStatus;
    const passChanged = eShowReset && eNewPassword.trim().length > 0;
    return roleChanged || nameChanged || accChanged || passChanged;
  }, [currentEditingUser, eRole, eName, eAccountActive, eShowReset, eNewPassword]);

  const handleSaveEdit = () => {
    if (!currentEditingUser) return;

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== currentEditingUser.id) return u;

        const updated: UserRow = {
          ...u,
          fullName: eName.trim(),
          // keep first/last if you want to split later; for now only fullName editable
          role: eRole as Role,
          accountStatus: eAccountActive ? "Active" : "Deactivated",
          loginStatus: eAccountActive ? u.loginStatus : "Offline",
        };

        return updated;
      })
    );

    if (eShowReset && eNewPassword.trim()) {
      // Hook to backend to actually reset password
      toast.success("User updated and password reset request queued");
    } else {
      toast.success("User updated successfully");
    }

    setShowEditModal(false);
    setEditUserId(null);
  };

  const handleToggleAccount = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              accountStatus: u.accountStatus === "Active" ? "Deactivated" : "Active",
              loginStatus:
                u.accountStatus === "Active" ? "Offline" : u.loginStatus,
            }
          : u
      )
    );
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage system users and their roles
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New User
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className={TH}>Username</th>
                    <th className={TH}>Name</th>
                    <th className={TH}>Role</th>
                    <th className={TH}>Account Status</th>
                    <th className={TH}>Login Status</th>
                    <th className={TH}>Last Login</th>
                    <th className={TH}>Created Date</th>
                    <th className="text-center p-3 font-semibold text-sm text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={`border-b ${
                        idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                      } hover:bg-muted/30 transition-colors`}
                    >
                      <td className={`${TD} font-medium`}>{user.username}</td>
                      <td className={TD}>{user.fullName}</td>
                      <td className={TD}>
                        <Badge className={roleBadgeClass(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className={TD}>
                        <Badge className={accountStatusBadgeClass(user.accountStatus)}>
                          {user.accountStatus}
                        </Badge>
                      </td>
                      <td className={TD}>
                        <Badge className={loginStatusBadgeClass(user.loginStatus)}>
                          {user.loginStatus}
                        </Badge>
                      </td>
                      <td className={`${TD} text-muted-foreground`}>
                        {fmtDateTime(user.lastLogin)}
                      </td>
                      <td className={`${TD} text-muted-foreground`}>
                        {fmtDateTime(user.createdDate)}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2 justify-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEdit(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit user</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleAccount(user.id)}
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {user.accountStatus === "Active"
                                ? "Deactivate account"
                                : "Activate account"}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td className="p-6 text-center text-muted-foreground" colSpan={8}>
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Create User Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>

            {/* Personal Information */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <p className="text-xs text-muted-foreground">
                  Enter the user’s personal details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cu-first">First Name</Label>
                  <Input
                    id="cu-first"
                    value={cuFirstName}
                    onChange={(e) => setCuFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cu-last">Last Name</Label>
                  <Input
                    id="cu-last"
                    value={cuLastName}
                    onChange={(e) => setCuLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cu-father">Father's Name</Label>
                  <Input
                    id="cu-father"
                    value={cuFatherName}
                    onChange={(e) => setCuFatherName(e.target.value)}
                    placeholder="Enter father's name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cu-mother">Mother's Name</Label>
                  <Input
                    id="cu-mother"
                    value={cuMotherName}
                    onChange={(e) => setCuMotherName(e.target.value)}
                    placeholder="Enter mother's name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={cuGender} onValueChange={setCuGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cu-dob">Date of Birth</Label>
                  <Input
                    id="cu-dob"
                    type="date"
                    value={cuDOB}
                    onChange={(e) => setCuDOB(e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="cu-address">Address</Label>
                  <Textarea
                    id="cu-address"
                    value={cuAddress}
                    onChange={(e) => setCuAddress(e.target.value)}
                    placeholder="House no, street, area, city, state, pincode"
                    rows={3}
                  />
                </div>
              </div>

              {/* Login Details */}
              <div className="space-y-1 pt-2">
                <h3 className="text-lg font-semibold">Login Details</h3>
                <p className="text-xs text-muted-foreground">
                  Create a unique username and a strong password
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cu-username">Username</Label>
                  <Input
                    id="cu-username"
                    value={cuUsername}
                    onChange={(e) => setCuUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cu-password">Password</Label>
                  <Input
                    id="cu-password"
                    type="password"
                    value={cuPassword}
                    onChange={(e) => setCuPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cu-confirm">Confirm Password</Label>
                  <Input
                    id="cu-confirm"
                    type="password"
                    value={cuConfirmPassword}
                    onChange={(e) => setCuConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              {/* System Role */}
              <div className="space-y-1 pt-2">
                <h3 className="text-lg font-semibold">System Access & Role</h3>
                <p className="text-xs text-muted-foreground">
                  Assign the user’s role in the system
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={cuRole} onValueChange={(v) => setCuRole(v as Role)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Principal">Principal</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="w-full" onClick={handleCreateUser} disabled={!canCreate}>
                  Create User
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {currentEditingUser ? `Edit User: ${currentEditingUser.username}` : "Edit User"}
              </DialogTitle>
            </DialogHeader>

            {currentEditingUser && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input value={currentEditingUser.username} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="e-name">Full Name</Label>
                  <Input
                    id="e-name"
                    value={eName}
                    onChange={(e) => setEName(e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={eRole} onValueChange={(v) => setERole(v as Role)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Principal">Principal</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="space-y-0.5">
                    <Label>Account Status</Label>
                    <p className="text-xs text-muted-foreground">
                      Toggle to activate or deactivate this user
                    </p>
                  </div>
                  <Switch
                    checked={eAccountActive}
                    onCheckedChange={setEAccountActive}
                  />
                </div>

                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="space-y-0.5">
                    <Label>Reset Password</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable to set a new password for this user
                    </p>
                  </div>
                  <Switch checked={eShowReset} onCheckedChange={setEShowReset} />
                </div>

                {eShowReset && (
                  <div className="space-y-2">
                    <Label htmlFor="e-password">New Password</Label>
                    <Input
                      id="e-password"
                      type="password"
                      value={eNewPassword}
                      onChange={(e) => setENewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    className="w-full"
                    onClick={handleSaveEdit}
                    disabled={!hasEditChanges}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default UserManagement;
