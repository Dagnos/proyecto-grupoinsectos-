require "application_system_test_case"

class UsuariosTest < ApplicationSystemTestCase
  setup do
    @usuario = usuarios(:one)
  end

  test "visiting the index" do
    visit usuarios_url
    assert_selector "h1", text: "Usuarios"
  end

  test "creating a Usuario" do
    visit usuarios_url
    click_on "New Usuario"

    fill_in "Apellidos", with: @usuario.apellidos
    fill_in "Contraseña", with: @usuario.contraseña
    fill_in "Correo", with: @usuario.correo
    fill_in "Edad", with: @usuario.edad
    fill_in "Nombres", with: @usuario.nombres
    fill_in "Usuario", with: @usuario.usuario
    click_on "Create Usuario"

    assert_text "Usuario was successfully created"
    click_on "Back"
  end

  test "updating a Usuario" do
    visit usuarios_url
    click_on "Edit", match: :first

    fill_in "Apellidos", with: @usuario.apellidos
    fill_in "Contraseña", with: @usuario.contraseña
    fill_in "Correo", with: @usuario.correo
    fill_in "Edad", with: @usuario.edad
    fill_in "Nombres", with: @usuario.nombres
    fill_in "Usuario", with: @usuario.usuario
    click_on "Update Usuario"

    assert_text "Usuario was successfully updated"
    click_on "Back"
  end

  test "destroying a Usuario" do
    visit usuarios_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Usuario was successfully destroyed"
  end
end
