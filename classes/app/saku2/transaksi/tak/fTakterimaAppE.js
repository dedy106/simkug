window.app_saku2_transaksi_tak_fTakterimaAppE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_tak_fTakterimaAppE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_tak_fTakterimaAppE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi TAK Terima Pembayaran: Batal", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Approve", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_app = new saiCBBL(this,{bound:[20,20,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});			
		this.e_total = new saiLabelEdit(this,{bound:[700,20,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,365], childPage:["Daftar Permintaan","Daftar Rekening"]});
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,
		            colTitle:["Status","Lokasi","No Kirim","Keterangan","Nilai","Akun TAK","Tgl Input","Progress"],
					colWidth:[[7,6,5,4,3,2,1,0],[60,100,80,100,360,100,80,80]],
					//buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell4"],readOnly : true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});		
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:9,
		            colTitle:["Keterangan","Nama Rekening","No Rekening","Bank","Cabang","Akun TAK","Jenis","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,60,80,150,60,100,200,200]],
					readOnly : true,colFormat:[[7],[cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg3});		
				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);		
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.nik,line.nama);
			} else this.cb_app.setText("","");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_tak_fTakterimaAppE.extend(window.childForm);
window.app_saku2_transaksi_tak_fTakterimaAppE.implement({
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
	/*
	simpan: function(){			
		try{												
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into yk_ver_m(no_ver, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','VTAK','"+this.e_periode.getText()+"','-','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate(),'APP')");
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i) && this.sg4.cells(0,i)=="APP"){
								sql.add("update takkirim_m set progress='V',no_link='"+this.e_nb.getText()+"' where no_kirim='"+this.sg4.cells(2,i)+"' and kode_lokasi='"+this.sg4.cells(1,i)+"'");							
								sql.add("insert into yk_ver_d(no_ver,modul,kode_lokasi,no_bukti,jenis,catatan,status) values "+
										"('"+this.e_nb.getText()+"','VTAK','"+this.app._lokasi+"','"+this.sg4.cells(2,i)+"','-','-','APP')");
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
	*/
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg3.clear(1);  this.sg4.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbHapus);
				break;
			/*
			case "ubah" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0 ) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
			*/	
			case "hapus" :	
					var status = "0";
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i) && this.sg4.cells(7,i)!="V"){
								var status = "1";
								system.alert(this,"Transaksi tidak valid.","Terdapat progress yang tidak dapat di batalkan (Batal = V)");
								return false;
							}
						}
					}					
					if (status == "0") {
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						sql.add("delete from yk_ver_m where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_ver_d where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update takkirim_m set progress='0',no_link='-' where no_link='"+this.e_nb.getText()+"' ");							
						setTipeButton(tbAllFalse);	
						this.dbLib.execArraySQL(sql);
					}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
	},
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_ver, keterangan from yk_ver_m where modul = 'VTAK' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_ver","keterangan"],false,["No App","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.sg4.clear(1); this.sg3.clear(1);			
			var strSQL = "select a.periode,a.tanggal,a.keterangan,a.nik_app "+
			             "from yk_ver_m a "+
			             "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_app.setText(line.nik_app);										
				} 
			}
			
			var strSQL = "select distinct a.kode_lokasi,a.no_kirim,a.keterangan,a.nilai,b.akun_tak,convert(varchar,a.tgl_input,120) as tgl_input,a.progress "+
		             "from takkirim_m a inner join yk_takkirim_d b on a.no_kirim=b.no_kirim and a.kode_lokasi=b.kode_lokasi "+
					 "where a.no_link='"+this.e_nb.getText()+"' and a.modul in ('TAKKB','TAKKBLOAD') order by a.kode_lokasi,a.no_kirim ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData(["APP",line.kode_lokasi,line.no_kirim,line.keterangan,floatToNilai(line.nilai),line.akun_tak,line.tgl_input,line.progress]);
				}
			} else this.sg4.clear(1);	
			this.sg4.validasi();			
		}
	},	
	doChangeCell4: function(sender, col, row){
		this.doNilaiChange();
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != "" && this.sg4.cells(0,i) == "APP"){
					tot += nilaiToFloat(this.sg4.cells(4,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doDoubleClick: function(sender, col, row){
		var strSQL = "select a.keterangan,a.nama_rek,a.no_rek,a.bank,a.cabang,a.akun_tak as kode_akun,a.jenis,a.nilai "+
					 "from yk_takkirim_d a where a.no_kirim='"+this.sg4.cells(2,row)+"' ";					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg3.appendData([line.keterangan,line.nama_rek,line.no_rek,line.bank,line.cabang,line.kode_akun,line.jenis,floatToNilai(line.nilai)]);
			}
		} else this.sg3.clear(1);	
		this.sg3.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});