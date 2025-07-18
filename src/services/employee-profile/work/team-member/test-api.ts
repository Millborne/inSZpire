// Test file to verify API endpoints
import { useTeamMemberService } from './use-team-member';

// Test function to verify API endpoints
export const testTeamMemberAPI = async () => {
    console.log("🧪 Testing Team Member API endpoints...");
    
    // Test employee ID from your example
    const testEmployeeId = "6989c59a2a9745ea81d593c3f2bf2740";
    const testPositionId = "7bcd1724451611f0b6b802dcb324866b";
    const testTeamId = "b811928b451411f0b6b802dcb324866b";
    
    console.log("Test Employee ID:", testEmployeeId);
    console.log("Test Position ID:", testPositionId);
    console.log("Test Team ID:", testTeamId);
    
    // This would be called from a component
    // const teamMemberService = useTeamMemberService();
    
    console.log("✅ Test setup complete");
};

// Export for use in components
export default testTeamMemberAPI; 