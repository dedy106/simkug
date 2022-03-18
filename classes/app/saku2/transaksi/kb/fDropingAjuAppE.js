window.app_saku2_transaksi_kb_fDropingAjuAppE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kb_fDropingAjuAppE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kb_fDropingAjuAppE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pertgg Pemakaian KasBank: Batal", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Approve", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});	
		this.cb_lokasi = new saiCBBL(this,{bound:[20,16,200,20],caption:"Lokasi",readOnly:true});		
		this.cb_aju = new saiCBBL(this,{bound:[20,15,220,20],caption:"No Pengajuan", readOnly:true});					    		
		this.e_norek = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Rekening", readOnly:true, maxLength:150});		
		this.e_tgl = new saiLabelEdit(this,{bound:[480,17,200,20],caption:"Tgl Input", readOnly: true});		
		this.e_total = new saiLabelEdit(this,{bound:[780,17,220,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this,{bound:[20,12,980,285], childPage:["Data Bukti KasBank","Detail Transaksi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["No Bukti","No Dokumen","Tanggal","Keterangan","Kode Akun","Nilai","Modul","DC","Index"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,60,80,100,80,250,80,120,120]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
					colFormat:[[5],[cfNilai]],					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Kode CF","Nama CF"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
	
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBVER' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<>'00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);												
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kb_fDropingAjuAppE.extend(window.childForm);
window.app_saku2_transaksi_kb_fDropingAjuAppE.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbHapus);
				break;			
			case "hapus" :	
					
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						sql.add("delete from yk_ver_m where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_ver_d where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update yk_kasaju_m set progress='0' where no_kasaju='"+this.cb_aju.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
						
						setTipeButton(tbAllFalse);	
						this.dbLib.execArraySQL(sql);
					
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
			this.e_nb.setSQL("select a.no_ver, a.keterangan from yk_ver_m a inner join yk_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi inner join yk_kasaju_m c on b.no_bukti=c.no_kasaju "+
			                 "where c.progress='1' and a.modul = 'KBAJU' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_ver","a.keterangan"],false,["No App","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.sg.clear(1); this.sg2.clear(1);			
			var strSQL = "select a.periode,a.tanggal,a.keterangan,a.nik_buat,a.nik_app,c.no_kasaju,c.kode_lokasi "+
			             "from yk_ver_m a inner join yk_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi inner join yk_kasaju_m c on b.no_bukti=c.no_kasaju "+
			             "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_app);					
					this.cb_lokasi.setText(line.kode_lokasi);
					this.cb_aju.setText(line.no_kasaju);
					var data2 = this.dbLib.getDataProvider("select convert(varchar,a.tgl_input,120) as tgl ,b.nama from yk_kasaju_m a inner join bank b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
														  "where a.no_kasaju='"+this.cb_aju.getText()+"' and a.kode_lokasi = '"+this.cb_lokasi.getText()+"'",true);
					if (typeof data2 == "object"){
						var line2 = data2.rs.rows[0];							
						if (line2 != undefined){
							this.e_norek.setText(line2.nama);						
							this.e_tgl.setText(line2.tgl);						
						} 
					}										
					this.doLoad();											
				} 
			}
		}		
	},
	doLoad:function(sender){		
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.nilai,a.modul,a.kode_akun,a.dc,a.no_urut "+
					 "from kas_j a "+					 
					 "             inner join yk_kasaju_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.nu and a.kode_akun=b.kode_akun "+
					 "where b.no_kasaju='"+this.cb_aju.getText()+"' and b.kode_lokasi = '"+this.cb_lokasi.getText()+"' order by a.no_kas ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
		this.doNilaiChange();		
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_kas,line.no_dokumen,line.tanggal,line.keterangan,line.kode_akun,floatToNilai(line.nilai),line.modul,line.dc,line.no_urut]);
		}
		this.sg.setNoUrut(start);		
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;			
			var line;			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.nilai != ""){					
					if (line.dc == "C" ) tot += Math.round(line.nilai);
					if (line.dc == "D" ) tot -= Math.round(line.nilai);
				}						
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			this.sg2.clear();
			this.pc1.setActivePage(this.pc1.childPage[0]);
			var strSQL = "select a.kode_pp,b.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,a.dc,a.keterangan,a.kode_cf,isnull(e.nama,'-') as nama_cf  "+
						 "from kas_j a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "			   inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "			   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						 "			   left join neracacf e on a.kode_cf=e.kode_cf and a.kode_lokasi=e.kode_lokasi "+
						 "where a.no_kas = '"+this.sg.cells(0,row)+"' and a.kode_lokasi = '"+this.cb_lokasi.getText()+"' order by a.dc desc ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.kode_cf,line.nama_cf]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
