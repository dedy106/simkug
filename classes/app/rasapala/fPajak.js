window.app_rasapala_fPajak = function(owner)
{
	if (owner)
	{
		window.app_rasapala_fPajak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rasapala_fPajak";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Validasi PPN : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Validasi",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_ppn = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun PPN", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_vendor = new saiCBBL(this,{bound:[20,17,200,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new button(this,{bound:[835,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});					
		
		this.p1 = new portalui_panel(this,{bound:[20,12,900,307],caption:"Daftar SPB Hutang Apotek"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:8,tag:0,
		            colTitle:["No SPB","No Dokumen","Tanggal","Keterangan","Nilai","Nilai PPN","No FPajak","Akun Hutang"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,140,100,100,230,80,100,100]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,7],[5,6]],
					change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_ppn.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_vendor.setSQL("select kode_vendor,nama from vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rasapala_fPajak.extend(window.childForm);
window.app_rasapala_fPajak.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ras_ppn_m","no_ppn",this.app._lokasi+"-PPN"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into ras_ppn_m(no_ppn,kode_lokasi,periode,tanggal,kode_vendor,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_vendor.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"',0,'F')");					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.nilai_ppn != "0"){
							sql.add("insert into ras_ppn_d(no_ppn,no_bukti,nilai_ppn,no_fpajak,kode_lokasi,periode) values "+
									"	('"+this.e_nb.getText()+"','"+line.no_spb+"',"+line.nilai_ppn+",'"+line.no_fpajak+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
							sql.add("insert into ras_ppn_j(no_ppn,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','"+line.no_spb+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_ppn.getText()+"','"+line.keterangan+"','D',"+line.nilai_ppn+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PPN','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							sql.add("insert into ras_ppn_j(no_ppn,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','"+line.no_spb+"','"+this.dp_d1.getDateString()+"',1,'"+line.kode_akun+"','"+line.keterangan+"','C',"+line.nilai_ppn+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PPN','AP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						}
					}
					sql.add("update a set a.progress='2',a.nilai=a.nilai+b.nilai_ppn,a.nilai_ppn=b.nilai_ppn,a.no_fpajak=b.no_fpajak "+
					        "from spb_m a inner join ras_ppn_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi where b.no_ppn='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :			
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot += parseFloat(line.nilai_ppn);
					if (line.nilai_ppn != "0" && (line.no_fpajak == "-" || line.no_fpajak == "")){
						system.alert(this,"Transaksi tidak valid.","Data PPN harus lengkap (nilai dan no pajak)");
						return false;
					}
				}
				if (tot == 0){
					system.alert(this,"Transaksi tidak valid.","Nilai PPN tidak boleh nol.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ras_ppn_m","no_ppn",this.app._lokasi+"-PPN"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doChange: function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
		}
	},
	doLoad: function(sender){
		var strSQL = "select a.no_spb,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai,0 as nilai_ppn,'-' as no_fpajak,b.kode_akun "+
					 "from spb_m a inner join spb_j b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi and b.jenis='AP' "+
					 "where a.kode_terima = '"+this.cb_vendor.getText()+"' and a.nilai_ppn=0 and a.no_fpajak='-' and a.progress='1' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_spb";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			this.sg.appendData([line.no_spb,line.no_dokumen,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),line.no_fpajak,line.kode_akun]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 5) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].nilai_ppn = parseNilai(this.sg.cells(5,row));
		}
		if (col == 6) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].no_fpajak = this.sg.cells(6,row);
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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