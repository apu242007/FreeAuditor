# FreeAuditor

A free, open-source security and compliance auditing tool written in Python.

## Features

- **System Audit**: Analyze system configuration and security settings
- **Network Audit**: Check network security (requires appropriate permissions)
- **Compliance Check**: Verify adherence to basic security practices
- **Command Line Interface**: Easy-to-use CLI for all auditing functions

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/apu242007/FreeAuditor.git
   cd FreeAuditor
   ```

2. Install Python dependencies (optional):
   ```bash
   pip install -r requirements.txt
   ```

## How to Run the App (Cómo correr la app)

### Method 1: Using the Launcher Script (Recommended)

```bash
./run.sh --help
```

### Method 2: Direct Python Execution

```bash
python main.py --help
```

### Available Commands

- **System Audit**:
  ```bash
  ./run.sh --system
  # or
  python main.py --system
  ```

- **Network Audit**:
  ```bash
  ./run.sh --network
  # or  
  python main.py --network
  ```

- **Compliance Check**:
  ```bash
  ./run.sh --compliance
  # or
  python main.py --compliance
  ```

- **Run All Audits**:
  ```bash
  ./run.sh --all
  # or
  python main.py --all
  ```

### Quick Start

To run a complete audit of your system:

```bash
./run.sh --all
# or
python main.py --all
```

## Requirements

- Python 3.6 or higher
- No additional dependencies required for basic functionality

## License

Open source - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.