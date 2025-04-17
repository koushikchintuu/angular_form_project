# Angular Contact Form Application

A modern, responsive contact form application built with Angular. This application features a clean user interface, form validation, file upload capability, and a success page.

## Features

- **Modern UI/UX Design**
  - Clean and responsive layout
  - Custom CSS styling
  - Smooth animations and transitions
  - Loading states and visual feedback

- **Form Functionality**
  - Name, email, and message fields with validation
  - File upload support (JPEG, PNG, PDF)
  - File size limit (5MB)
  - Image preview for uploaded files
  - Form validation with error messages

- **Technical Features**
  - Angular Reactive Forms
  - FormData handling for file uploads
  - Responsive design for all device sizes
  - TypeScript type safety
  - Simulated API integration

## Prerequisites

- Node.js (v14 or later)
- Angular CLI (v15.2.11 or later)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd forms-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

Run the development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/` to view the application.

## Building

To build the project for production:
```bash
ng build
```
The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
forms-app/
├── src/
│   ├── app/
│   │   ├── contact-form/         # Contact form component
│   │   ├── success-page/         # Success page component
│   │   ├── services/             # Contact service
│   │   ├── app.component.*       # Main app component
│   │   ├── app.module.ts         # App module
│   │   └── app-routing.module.ts # Routing configuration
│   └── styles.css               # Global styles
├── angular.json                 # Angular configuration
└── package.json                # Project dependencies
```

## Customization

- **Styling**: Modify the CSS files in the components to change the appearance
- **Form Fields**: Update the form validation rules in `contact-form.component.ts`
- **File Upload**: Adjust file size limits and allowed types in the contact form component
- **API Integration**: Modify the `contact.service.ts` to connect to a real backend API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the maintainers.
