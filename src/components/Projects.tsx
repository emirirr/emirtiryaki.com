import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Eye } from "lucide-react";
import { projects } from "@/data/projects";

const Projects = () => {
  // Get first 8 projects for homepage
  const homepageProjects = projects.slice(0, 8);
  const featuredProjects = homepageProjects.slice(0, 3);
  const otherProjects = homepageProjects.slice(3);

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
            {featuredProjects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card 
                  key={project.id}
                  className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <IconComponent className="h-16 w-16 text-primary/60" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-8 w-8 p-0"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                      {project.link !== "https://emirtiryaki.com" && (
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
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
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Kod
                        </Button>
                      )}
                      {project.link !== "https://emirtiryaki.com" && (
                        <Button 
                          size="sm" 
                          className={project.github ? "flex-1 hero-gradient" : "w-full hero-gradient"}
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Daha Fazla Proje</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card 
                  key={project.id}
                  className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                        {project.link !== "https://emirtiryaki.com" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(project.link, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Daha fazla proje GitHub profilimde mevcut
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8"
              onClick={() => window.open('https://github.com/emirirr', '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub'da Daha Fazlası
            </Button>
            <Button 
              size="lg" 
              className="px-8 hero-gradient"
              onClick={() => window.location.href = '/projects'}
            >
              Tüm Projeleri Gör
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
