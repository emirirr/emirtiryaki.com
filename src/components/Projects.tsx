import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Eye } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Ticaret Platform",
      description: "Modern ve kullanıcı dostu bir e-ticaret platformu. React, Node.js ve MongoDB kullanılarak geliştirildi. Gerçek zamanlı ödeme entegrasyonu ve admin paneli içerir.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500",
      github: "#",
      live: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Takım çalışması için geliştirilmiş modern bir görev yönetim uygulaması. Drag & drop özelliği, gerçek zamanlı bildirimleri ve detaylı raporlama sistemi.",
      tech: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
      github: "#",
      live: "#",
      featured: true
    },
    {
      title: "Weather Analytics Dashboard",
      description: "Hava durumu verilerini analiz eden ve görselleştiren kapsamlı bir dashboard. API entegrasyonu ve interaktif grafikler.",
      tech: ["React", "D3.js", "Python", "FastAPI", "Docker"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500",
      github: "#",
      live: "#",
      featured: false
    },
    {
      title: "Real Estate Platform",
      description: "Gayrimenkul sektörü için geliştirilmiş arama ve listeleme platformu. Harita entegrasyonu ve gelişmiş filtreleme özellikleri.",
      tech: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      github: "#",
      live: "#",
      featured: false
    },
    {
      title: "Social Media Analytics",
      description: "Sosyal medya hesaplarını analiz eden ve detaylı raporlar sunan analitik platformu. Çoklu platform desteği.",
      tech: ["React", "Node.js", "MongoDB", "Chart.js"],
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=500",
      github: "#",
      live: "#",
      featured: false
    },
    {
      title: "Learning Management System",
      description: "Online eğitim platformu. Video streaming, quiz sistemi, ilerleme takibi ve sertifika yönetimi içerir.",
      tech: ["Vue.js", "Django", "PostgreSQL", "AWS S3"],
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500",
      github: "#",
      live: "#",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Projelerim</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerçek dünya problemlerini çözen, kullanıcı odaklı uygulamalar geliştiriyorum
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Öne Çıkan Projeler</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={project.title}
                className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="mr-2 h-4 w-4" />
                      Kod
                    </Button>
                    <Button size="sm" className="flex-1 hero-gradient">
                      <Eye className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Diğer Projeler</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card 
                key={project.title}
                className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Daha fazla proje GitHub profilimde mevcut
          </p>
          <Button size="lg" variant="outline" className="px-8">
            <Github className="mr-2 h-5 w-5" />
            GitHub'da Daha Fazlası
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
