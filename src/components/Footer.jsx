import { Footer } from "flowbite-react";

const CustomFooter = () => {
  return (
    <Footer
      container
      className="bg-gradient-to-r from-yellow-400 via-purple-600 to-blue-800 text-white py-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
          {/* Logo Column */}
          <div>
            <Footer.Brand
              src="https://i.ibb.co/ZVB1Ld0/logo.png"
              alt="Logo"
              name="PetCare"
              className="w-40 h-auto mb-3"
            />
          </div>
          {/* Services Column */}
          <div>
            <Footer.Title title="Services" className="text-white" />
            <Footer.LinkGroup col className="text-white">
              <Footer.Link href="pet-listing" className="hover:text-gray-300">
                Pet Adoption
              </Footer.Link>
              <Footer.Link href="/donation-campaigns" className="hover:text-gray-300">
                Donation
              </Footer.Link>
              <Footer.Link href="/" className="hover:text-gray-300">
                Home
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          {/* Company Column */}
          <div>
            <Footer.Title title="Company" className="text-white" />
            <Footer.LinkGroup col className="text-white">
              <Footer.Link href="#" className="hover:text-gray-300">
                About Us
              </Footer.Link>
              <Footer.Link href="#" className="hover:text-gray-300">
                Careers
              </Footer.Link>
              <Footer.Link href="#" className="hover:text-gray-300">
                Contact
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          {/* Follow Us Column */}
          <div>
            <Footer.Title title="Follow Us" className="text-white" />
            <div className="flex space-x-4 mt-4 mb-4 text-white">
              <Footer.Icon
                href="#"
                icon={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.988h-2.54v-2.89h2.54V9.797c0-2.507 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                )}
                ariaLabel="Facebook"
                className="hover:text-gray-300"
              />
              <Footer.Icon
                href="#"
                icon={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                )}
                ariaLabel="Twitter"
                className="hover:text-gray-300"
              />
              <Footer.Icon
                href="#"
                icon={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 2a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zm4.25-.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                  </svg>
                )}
                ariaLabel="Instagram"
                className="hover:text-gray-300"
              />
            </div>
          </div>
        </div>
        {/* Horizontal Line and Footer Note */}
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          by=" | Paw & Harmony"
          year={new Date().getFullYear()}
          className="text-white"
        />
      </div>
    </Footer>
  );
};

export default CustomFooter;

