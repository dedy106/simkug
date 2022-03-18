window.app_saku2_transaksi_kb_fIfAju = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kb_fIfAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kb_fIfAju";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reimburse I/F: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_tahu = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.e_saldo = new saiLabelEdit(this,{bound:[780,16,220,20],caption:"Sisa I/F", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_setuju = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Menyetujui", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[780,17,220,20],caption:"Nilai Pertgg.", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bTampil = new button(this,{bound:[620,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_appAll = new portalui_imageButton(this,{bound:[705,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,347], childPage:["Data Imprest Fund","Detail Transaksi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","PP","Pengaju","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,280,60,100,100,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					colFormat:[[7],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});			
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Tanggal"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			var data = this.dbLib.getDataProvider("select kode_bidang from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodeBidang = line.kode_bidang;
			} else this.kodeBidang = "-";
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_buat.setSQL("select a.nik,a.nama from karyawan a "+
			                    "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"inner join yk_if_m x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
								"where b.kode_bidang='"+this.kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK Pemegang",true);

								
			this.cb_tahu.setSQL("select a.nik,a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);						
			this.cb_setuju.setSQL("select a.nik,a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK Menyetujui",true);									
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kb_fIfAju.extend(window.childForm);
window.app_saku2_transaksi_kb_fIfAju.implement({
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
					this.doClick(this.i_gen);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into yk_ifapp_m(no_app,kode_lokasi,tanggal,no_dokumen,keterangan,periode,nik_buat,nik_tahu,nik_setuju,nilai,tgl_input,no_kas) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_setuju.getText()+"',"+parseNilai(this.e_total.getText())+",getdate(),'-')");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){							
							sql.add("update yk_ifptg_m set no_app='"+this.e_nb.getText()+"',progress='1' where no_ifptg='"+line.no_ifptg+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "APP") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status APP.");
					return false;
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total reimburse tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total reimburse tidak boleh melebihi saldo I/F.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_ifapp_m","no_app",this.app._lokasi+"-IFAP"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_appAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "APP";
			}
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];							
				if (line.status == "APP") tot += parseFloat(line.nilai);
			}
			this.e_total.setText(floatToNilai(tot));
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}
		if (sender == this.cb_buat && this.cb_buat.getText()!=""){			
			var data = this.dbLib.getDataProvider(
					   "select a.nik_tahu,a.nik_setuju,c.nama as nama_tahu,d.nama as nama_setuju, a.nilai-isnull(b.pakai,0) as sisa "+					   
					   "from yk_if_m a "+
					   "			   inner join karyawan c on a.nik_tahu=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "               inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi "+
					   "               left join (select nik_buat,kode_lokasi,sum(nilai) as pakai from yk_ifapp_m where nik_buat='"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_kas='-' group by nik_buat,kode_lokasi) b on a.nik=b.nik_buat and a.kode_lokasi=b.kode_lokasi  "+
					   "where a.nik='"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.e_saldo.setText(floatToNilai(line.sisa));
					this.cb_tahu.setText(line.nik_tahu,line.nama_tahu);
					this.cb_setuju.setText(line.nik_setuju,line.nama_setuju);
				} 
			}
		}	
	},
	doLoad:function(sender){
		var strSQL = "select 'INPROG' as status,a.no_ifptg,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_pp+' - '+b.nama as pp,a.nik_buat+' - '+c.nama as pengaju,a.nilai "+
					 "from yk_ifptg_m a "+ 
					 "					inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 " 				    inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.progress ='0' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_ifptg,line.no_dokumen,line.tanggal,line.keterangan,line.pp,line.pengaju,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
	},	
	doChangeCells: function(sender, col , row) {
		if (col == 0 ) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);			
		}
		if (col == 1 ) {		
			this.dataJU.rs.rows[((this.page-1)*20) + row].catatan = this.sg.cells(1,row);
		}
		
		
		var tot = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];							
			if (line.status == "APP") tot += parseFloat(line.nilai);
		}
		this.e_total.setText(floatToNilai(tot));
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			this.sg2.clear();
			this.pc1.setActivePage(this.pc1.childPage[0]);
			var strSQL = "select a.kode_pp,b.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,a.dc,a.keterangan,convert(varchar,a.tanggal,103) as tanggal  "+
						 "from yk_ifptg_j a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "				    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						 "where a.no_ifptg = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.tanggal]);
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
