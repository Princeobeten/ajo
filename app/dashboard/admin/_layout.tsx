// import { AdminProvider } from "@/app/contexts/AdminContext";
// import { AnalyticsProvider } from "@/app/contexts/AnalyticsContext";
// import { GroupProvider } from "@/app/contexts/GroupContext";
// import { KYCProvider } from "@/app/contexts/KYCContext";
// import { LoanProvider } from "@/app/contexts/LoanContext";
// import { SettingsProvider } from "@/app/contexts/SettingsContext";

// // In your app layout or root component
// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AdminProvider>
//       <SettingsProvider>
//         <AnalyticsProvider>
//           <KYCProvider>
//             <LoanProvider>
//               <GroupProvider>
//                 {children}
//               </GroupProvider>
//             </LoanProvider>
//           </KYCProvider>
//         </AnalyticsProvider>
//       </SettingsProvider>
//     </AdminProvider>
//   );
// }