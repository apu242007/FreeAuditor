#!/usr/bin/env python3
"""
FreeAuditor - A free auditing tool for security and compliance checks
"""

import argparse
import sys
import os
from datetime import datetime

class FreeAuditor:
    """Main FreeAuditor class for performing audits"""
    
    def __init__(self):
        self.version = "1.0.0"
        self.name = "FreeAuditor"
    
    def display_banner(self):
        """Display application banner"""
        print("=" * 50)
        print(f"  {self.name} v{self.version}")
        print("  Free Security & Compliance Auditing Tool")
        print("=" * 50)
        print()
    
    def system_audit(self):
        """Perform basic system audit"""
        print("🔍 Starting System Audit...")
        print(f"📅 Audit Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print()
        
        # Basic system information
        print("📊 System Information:")
        print(f"  • Operating System: {os.name}")
        print(f"  • Python Version: {sys.version.split()[0]}")
        print(f"  • Current Directory: {os.getcwd()}")
        print()
        
        # File system checks
        print("📁 File System Checks:")
        current_dir = os.getcwd()
        files = os.listdir(current_dir)
        print(f"  • Files in current directory: {len(files)}")
        
        # Check for common configuration files
        config_files = ['.env', 'config.ini', '.git', 'requirements.txt']
        found_configs = [f for f in config_files if f in files]
        if found_configs:
            print(f"  • Configuration files found: {', '.join(found_configs)}")
        else:
            print("  • No common configuration files found")
        
        print()
        print("✅ Basic audit completed successfully!")
        print()
    
    def network_audit(self):
        """Perform basic network audit"""
        print("🌐 Starting Network Audit...")
        print("⚠️  Network auditing requires additional privileges")
        print("💡 Tip: Run with appropriate permissions for full network audit")
        print()
    
    def compliance_check(self):
        """Perform basic compliance checks"""
        print("📋 Starting Compliance Check...")
        print("✅ Checking basic security practices...")
        
        # Check if README exists
        if os.path.exists('README.md'):
            print("  • Documentation: README.md found ✅")
        else:
            print("  • Documentation: README.md missing ❌")
        
        # Check if .gitignore exists
        if os.path.exists('.gitignore'):
            print("  • Version Control: .gitignore found ✅")
        else:
            print("  • Version Control: .gitignore missing ⚠️")
        
        print()
        print("✅ Compliance check completed!")
        print()

def main():
    """Main application entry point"""
    parser = argparse.ArgumentParser(
        description="FreeAuditor - Free Security & Compliance Auditing Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py --system     # Run system audit
  python main.py --network    # Run network audit  
  python main.py --compliance # Run compliance check
  python main.py --all        # Run all audits
        """
    )
    
    parser.add_argument('--system', action='store_true', 
                       help='Perform system audit')
    parser.add_argument('--network', action='store_true', 
                       help='Perform network audit')
    parser.add_argument('--compliance', action='store_true', 
                       help='Perform compliance check')
    parser.add_argument('--all', action='store_true', 
                       help='Run all available audits')
    parser.add_argument('--version', action='version', version='FreeAuditor 1.0.0')
    
    args = parser.parse_args()
    
    auditor = FreeAuditor()
    auditor.display_banner()
    
    # If no specific audit requested, show help
    if not any([args.system, args.network, args.compliance, args.all]):
        parser.print_help()
        return
    
    # Run requested audits
    if args.all or args.system:
        auditor.system_audit()
    
    if args.all or args.network:
        auditor.network_audit()
    
    if args.all or args.compliance:
        auditor.compliance_check()

if __name__ == "__main__":
    main()