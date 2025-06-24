{
  description = "Dev environment for overlayed";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, }: {
    devShells.x86_64-linux.default =
      let pkgs = import nixpkgs { system = "x86_64-linux"; };
      in pkgs.mkShell {
        buildInputs = with pkgs; [ bun tailwindcss_4 nodePackages.serve ];

        shellHook = ''
          export SHELL=${pkgs.zsh}/bin/zsh
          if [ -z "$ZSH_VERSION" ]; then
            exec zsh
          fi
        '';
      };
  };
}
