import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import profileImage from "@/assets/emir-profile.jpg";
import heroBg from "@/assets/tech-hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-tech-cyan rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src={profileImage}
                alt="Emir Tiryaki"
                className="w-32 h-32 rounded-full border-4 border-primary glow-effect object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-glow" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">Emir Tiryaki</span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-muted-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Full Stack Developer
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Modern web uygulamaları ve kullanıcı deneyimleri oluşturan tutkulu bir geliştirici. 
            Frontend'den backend'e kadar teknoloji yığınının her katmanında uzmanım.
          </p>
          
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {['React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm font-medium bg-muted/50 hover:bg-muted transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex justify-center items-center mb-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Button 
              size="lg" 
              className="hero-gradient glow-effect px-8 py-3 text-lg font-semibold"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              İletişime Geç
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 animate-slide-up" style={{ animationDelay: '1s' }}>
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open('https://github.com/emirirr', '_blank')}
            >
              <Github className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open('https://www.linkedin.com/in/emir-tiryaki/', '_blank')}
            >
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open('mailto:info@emirtiryaki.com', '_blank')}
            >
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;