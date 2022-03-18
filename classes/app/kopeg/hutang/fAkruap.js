window.app_kopeg_hutang_fAkruap = function(owner)
{
	if (owner)
	{
		window.app_kopeg_hutang_fAkruap.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_hutang_fAkruap";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hutang Bank: Input", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,443,20],caption:"Keterangan", maxLength:150});						
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"PP/Unit Kerja",tag:2,multiSelection:false});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Png Jawab",tag:2,multiSelection:false});						
		this.e_jml = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Lama Bulan",tipeText:ttNilai,tag:1,text:"0"});
		this.cb_kjpe = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Akun KJPe",tag:2,multiSelection:false});		
		this.e_kjpe = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai KJPe",tipeText:ttNilai,tag:1,text:"0",change:[this,"doChange"]});
		this.cb_kjpa = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Akun KJPa",tag:2,multiSelection:false});		
		this.e_kjpa = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai KJPa",tipeText:ttNilai,tag:1,text:"0",change:[this,"doChange"]});
		this.cb_bunga = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"Akun Bbn Bunga",tag:2,multiSelection:false});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,19,200,20],caption:"Total Hutang",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		this.cb_vendor = new portalui_saiCBBL(this,{bound:[20,20,200,20],caption:"Bank",tag:2,multiSelection:false, change:[this,"doChange"]});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,20,200,20],caption:"Total Jurnal +",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,240],caption:"Daftar Item Jurnal Tambahan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,200],colCount:9,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,100,200,50,100,60,100,60,100]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1,6,8],[0]],nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,215,900,25],buttonStyle:2,grid:this.sg});		
				
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro='APKBIM' and kode_lokasi = '"+this.app._lokasi+"'"); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "APKBIM") this.akunIM = line.flag;
				}
			}		
			this.cb_bunga.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='020' ",["a.kode_akun","a.nama"],true,["Kode Akun","Nama"],"and","Daftar Akun",true);
			this.cb_kjpa.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024' ",["a.kode_akun","a.nama"],true,["Kode Akun","Nama"],"and","Daftar Akun KJPA",true);
			this.cb_kjpe.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024' ",["a.kode_akun","a.nama"],true,["Kode Akun","Nama"],"and","Daftar Akun KJPE",true);
			this.cb_vendor.setSQL("select kode_vendor,nama from vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],true,["Kode Vendor","Nama"],"and","Daftar Vendor",true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],true,["Kode PP","Nama"],"and","Daftar PP",true);
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true,["NIK","Nama"],"and","Daftar Karyawan",true);
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_pp, nama from pp where tipe='Posting' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and a.kode_lokasi='"+this.app._lokasi+"' ");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_hutang_fAkruap.extend(window.portalui_childForm);
window.app_kopeg_hutang_fAkruap.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_ap_m','no_ap',this.app._lokasi+"-HUT"+this.e_periode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					var totKB = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_tot.getText());
					sql.add("insert into kop_ap_m (no_ap,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_kjpe,akun_kjpa,no_del,no_link,nik_user,tgl_input,kode_vendor,nilai_kjpe,nilai_kjpa,progress,akun_im,no_dana,jbln,akun_bunga,tgl_angsur)  values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+totKB+",'APBANK','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','F',1,'IDR','"+this.cb_kjpe.getText()+"','"+this.cb_kjpa.getText()+"','-','-','"+this.app._userLog+"',now(),'"+this.cb_vendor.getText()+"',"+parseNilai(this.e_kjpe.getText())+","+parseNilai(this.e_kjpa.getText())+",'0','"+this.akunIM+"','-',"+parseNilai(this.e_jml.getText())+",'"+this.cb_bunga.getText()+"','1900-01-01')");
					if (this.e_kjpe.getText() != "0") {
						sql.add("insert into kop_ap_d (no_ap,no_kjpe,akun_kjpe,periode,dc,nilai,kode_lokasi,kurs,kode_curr)  values "+
								"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.cb_kjpe.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.e_kjpe.getText())+",'"+this.app._lokasi+"',1,'IDR')");
					}
					sql.add("insert into kop_ap_j (no_ap,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunIM+"','"+this.e_desc.getText()+"','D',"+totKB+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','APBANK','ARIM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into kop_ap_j (no_ap,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_kjpe.getText()+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_kjpe.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','APBANK','KJPE','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into kop_ap_j (no_ap,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.cb_kjpa.getText()+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_kjpa.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','APBANK','KJPA','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");					
					var idx = 3;
					for (var i=0; i < this.sg.rows.getLength(); i++){			
						if (this.sg.rowValid(i)){
							idx++;
							sql.add("insert into kop_ap_j (no_ap,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							        "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','APBANK','BBN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
						}
					}
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "simpan" :
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doChange:function(sender){
		if (sender == this.e_kjpa || sender == this.e_kjpe) {
			if (this.e_kjpa.getText() != "" && this.e_kjpe.getText() != "") {
				this.e_nilai.setText(floatToNilai(nilaiToFloat(this.e_kjpe.getText()) + nilaiToFloat(this.e_kjpa.getText())));
			}
		}
		if (sender == this.cb_vendor){
			this.sg2.clear(1);
			this.sg2.validasi();
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_ap_m','no_ap',this.app._lokasi+"-HUT"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doBtnClick: function(sender, event){
		try{			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='Posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='Posting'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){
					this.standarLib.showListData(this, "Daftar Anggaran",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.app._periode.substr(0,4)+"%' and b.kode_pp = '"+this.sg.getCell(5,row)+"' and b.kode_akun='"+this.sg.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.app._periode.substr(0,4)+"%' and b.kode_pp = '"+this.sg.getCell(5,row)+"' and b.kode_akun='"+this.sg.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode Anggaran","Deskripsi"),true);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		try{
           if ((col == 3 || col == 4) && (this.sg2.getCell(4,row) != "")) sender.validasi();
		   sender.onChange.set(this,undefined);
    	   if (col == 0) {
                var akun = this.dataAkun.get(sender.cells(0,row));
                if(akun)
                    sender.cells(1,row,akun);
                else {                                    
                    if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
                    sender.cells(0,row,"");
                    sender.cells(1,row,"");
                }
            }
			if (col == 5) {
                var pp = this.dataPP.get(sender.cells(5,row));
                if (pp) sender.cells(6,row,pp);
                else sender.cells(6,row,"-");
            }
    	   if (col == 7) {
    	       var drk = this.dataDRK.get(sender.cells(7,row));
    	       if (drk) sender.cells(8,row,drk);
    	       else sender.cells(8,row,"-");
            }
            if (col == 3){
                if (this.sg.getCell(3, row).toUpperCase() != "C" && this.sg.getCell(3, row).toUpperCase() != "D")
                    this.sg.cells(3,row,"D");            
                else this.sg.cells(3,row,this.sg.getCell(3, row).toUpperCase());            
            }
            sender.onChange.set(this,"doChangeCell");
        }catch(e){
            sender.onChange.set(this,"doChangeCell");
        }
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.getCell(4,i) != ""){
					if (this.sg.getCell(3,i).toUpperCase() == "D") tot += nilaiToFloat(this.sg.getCell(4,i));			
					if (this.sg.getCell(3,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg.getCell(4,i));			
				}
			}
			this.e_tot.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":						
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
							this.dataDRK = new portalui_arrayMap();
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataAkun.set(line.kode_akun, line.nama);
                                }
                            }
							if (result.result[1]){	    			        
	    			            var line;
	    			            for (var i in result.result[1].rs.rows){
	    			                line = result.result[1].rs.rows[i];
	    			                this.dataPP.set(line.kode_pp, line.nama);
                                }
                            }
                            if (result.result[2]){
	    			            var line;
	    			            for (var i in result.result[2].rs.rows){
	    			                line = result.result[2].rs.rows[i];
	    			                this.dataDRK.set(line.kode_drk, line.nama);
                                }
                            }
                        }else throw result;
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});
