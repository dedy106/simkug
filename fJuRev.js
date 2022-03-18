window.app_saku2_transaksi_gl_fJuRev = function(owner){
	if (owner){
		window.app_saku2_transaksi_gl_fJuRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gl_fJuRev";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Jurnal Reverse: Input", 0);			
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"No Jurnal",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,19,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new portalui_button(this,{bound:[620,19,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,19,200,20],caption:"Total Reverse",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,310], childPage:["Bukti Jurnal Reverse","Detail Transaksi","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,
		            colTitle:["Status","No JU","Tanggal","No Dokumen","Keterangan","Periode","Jenis","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,70,70,210,150,70,100,80]],
					colMaxLength:[[7,5,3,2,0],[10,10,150,1,20]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					buttonStyle:[[0],[bsAuto]], 
					colFormat:[[7],[cfNilai]],picklist:[[0],[new portalui_arrayMap({items:["REKLAS","INPROG"]})]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode Akt.","Nama Aktifitas"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],
					colMaxLength:[[7,5,3,2,0],[10,10,150,1,20]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir","DC"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[50,100,100,100,120,80,120,80,140,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});
		this.i_budget = new portalui_imageButton(this.sgn3,{bound:[875,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gl_fJuRev.extend(window.portalui_childForm);
 window.app_saku2_transaksi_gl_fJuRev.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','JU','UMUM','IDR',1,"+parseNilai(this.e_tot.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-','REV_K',getdate(),'"+this.app._userLog+"')");
					
					for (var i=0; i < this.sg.rows.getLength(); i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "REKLAS") {
							sql.add(" update ju_m set jenis='REV_REK',ref1='"+this.e_nb.getText()+"' where no_ju = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");							
							sql.add(" insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"	   			    kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
									" select '"+this.e_nb.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"        kode_lokasi,'JU','UMUM','"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',getdate() "+
									" from ju_j where no_ju = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}
					}
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
							    if (nilaiToFloat(this.sg3.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg3.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg3.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','JU','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(2,i)+"','"+this.sg3.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg3.cells(6,i))+","+nilai+")");
							}
						}
					}
					setTipeButton(tbAllFalse);	
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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				this.sg.validasi();
				this.doHitungGar();
				for (var i=0;i < this.sg3.getRowCount();i++){
					if (nilaiToFloat(this.sg3.cells(8,i)) < 0) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_tot.getText() <= 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai penyelesaian reversal tidak boleh kurang atau sama dengan nol.");
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
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".",'000'));
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != ""){
				var data = this.dbLib.getDataProvider("select no_ju,convert(varchar,tanggal,103) as tanggal,no_dokumen,keterangan,periode,jenis,nilai "+
													  "from  ju_m "+
													  "where jenis = 'REVERSE' and no_del='-' and periode <= '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["INPROG",line.no_ju,line.tanggal,line.no_dokumen,line.keterangan,line.periode,line.jenis.toUpperCase(),floatToNilai(line.nilai)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Periode tidak valid.","Periode harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.getCell(0,row) != "")){
			this.sg.validasi();
		}
	},
	doDoubleClick: function(sender, col, row){
		try{
			if (this.sg.cells(1,row) != "") {
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
										 "from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										 "            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
										 "            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
										 "where a.no_ju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg2.clear(1);
			}
		}
		catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "REKLAS")&&(this.sg.cells(7,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(7,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
	},
	doHitungGar: function(){
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "REKLAS" && this.sg.cells(1,i) != ""){
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,case a.dc when 'D' then 'C' else 'D' end as dc,sum(case a.dc when 'D' then -nilai else nilai end) as nilai "+
							"from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
							"where a.kode_pp<>'-' and a.kode_drk<>'-' and a.no_ju='"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' group by a.kode_akun,b.nama,a.kode_pp,c.nama,a.kode_drk,d.nama,dc",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,"0",floatToNilai(line.nilai),"0",line.dc.toUpperCase()]);
					}
				} else this.sg3.clear(1);
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg3.getRowCount();i++){
			if (this.sg3.rowValid(i) && this.sg3.cells(9,i) == "D"){
				var data2 = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg3.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					data2 = line2.gar.split(";");
					sls = parseFloat(data2[0]) - parseFloat(data2[1]);
					this.sg3.cells(6,i,floatToNilai(sls));
					sls = sls - nilaiToFloat(this.sg3.cells(7,i));
					this.sg3.cells(8,i,floatToNilai(sls));
				}
			} else this.sg3.cells(8,i,"0");
		}				
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
