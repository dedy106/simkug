window.app_saku3_transaksi_travel_aset_fFaAkun = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_aset_fFaAkun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_aset_fFaAkun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kelompok Akun", 0);	

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.pc1 = new pageControl(this,{bound:[10,12,1000,460], childPage:["Daftar Kelompok","Data Kelompok","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
		            colTitle:["Kode","Nama","Umur-Thn","Persentase","Akun Aktap","Akun BP","Akun Akumulasi"],
					colWidth:[[6,5,4,3,2,1,0],[180,180,180,80,60,200,80]],
					colFormat:[[2,3],[cfNilai,cfNilai]],										
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_umur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Umur (Tahun)", maxLength:50, tag:1, tipeText:ttNilai,change:[this,"doChange"]});					
		this.e_persen = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"% Susut/thn", readOnly:true, tag:1, tipeText:ttNilai});											
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun Barang", multiSelection:false, maxLength:10, tag:2});		
		this.cb_bp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun Beban Susut", multiSelection:false, maxLength:10, tag:2});		
		this.cb_deprs = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Akun Akumulasi", multiSelection:false, maxLength:10, tag:2});		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Status",items:["1.SUSUT","0.NONSUSUT"], readOnly:true,tag:2});		

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_bp.setSQL("select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_deprs.setSQL("select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_aset_fFaAkun.extend(window.childForm);
window.app_saku3_transaksi_travel_aset_fFaAkun.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var umurBln = nilaiToFloat(this.e_umur.getText()) * 12;					
					sql.add("insert into fa_klpakun(kode_klpakun,nama,umur,persen,kode_akun,akun_bp,akun_deprs,kode_agg,tahun,kode_drk,kode_lokasi, flag_susut) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"',"+umurBln+","+nilaiToFloat(this.e_persen.getText())+",'"+this.cb_akun.getText()+"','"+this.cb_bp.getText()+"','"+this.cb_deprs.getText()+"','-','-','-','"+this.app._lokasi+"','"+this.c_status.getText().substr(0,1)+"')");									
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from fa_klpakun where kode_klpakun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					var umurBln = nilaiToFloat(this.e_umur.getText()) * 12;					
					sql.add("insert into fa_klpakun(kode_klpakun,nama,umur,persen,kode_akun,akun_bp,akun_deprs,kode_agg,tahun,kode_drk,kode_lokasi,flag_susut) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"',"+umurBln+","+nilaiToFloat(this.e_persen.getText())+",'"+this.cb_akun.getText()+"','"+this.cb_bp.getText()+"','"+this.cb_deprs.getText()+"','-','-','-','"+this.app._lokasi+"','"+this.c_status.getText().substr(0,1)+"')");									
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fa_klpakun where kode_klpakun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.simpan();
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
	doChange: function(sender){
		try{
			if (sender == this.e_umur && this.e_umur.getText() != ""){
				if (this.e_umur.getText() == 0) this.e_persen.setText("0");
				else {
					var persen = 100 / nilaiToFloat(this.e_umur.getText());
					this.e_persen.setText(floatToNilai(persen));
				}
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_klpakun,nama,umur,persen,kode_akun,akun_bp,akun_deprs,kode_agg,tahun,kode_drk,flag_susut "+
				             "from fa_klpakun where kode_klpakun ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_umur.setText(floatToNilai(line.umur)/12);
						this.e_persen.setText(floatToNilai(line.persen));
						this.cb_akun.setText(line.kode_akun);
						this.cb_bp.setText(line.akun_bp);
						this.cb_deprs.setText(line.akun_deprs);
						
						if (line.flag_susut=="1") this.c_status.setText("1.SUSUT");
						else this.c_status.setText("0.NONSUSUT");
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}	
			
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " a.kode_klpakun like '%"+this.e_kode2.getText()+"%' ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' ";			
			var strSQL = "select a.kode_klpakun,a.nama,a.umur /12 as umur,a.persen,a.kode_akun+' - '+ b.nama as akun,a.akun_bp+' - '+c.nama as bp,a.akun_deprs+' - '+d.nama as deprs "+
						 "from fa_klpakun a inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"' "+
						 "                  inner join masakun c on a.akun_bp=c.kode_akun and c.kode_lokasi ='"+this.app._lokasi+"' "+
						 "                  inner join masakun d on a.akun_deprs=d.kode_akun and d.kode_lokasi ='"+this.app._lokasi+"'  "+
						 "where kode_lokasi='"+this.app._lokasi+"' and "+filter;
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select a.kode_klpakun,a.nama,a.umur /12 as umur,a.persen,a.kode_akun+' - '+ b.nama as akun,a.akun_bp+' - '+c.nama as bp,a.akun_deprs+' - '+d.nama as deprs "+
						 "from fa_klpakun a inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"'  "+
						 "                  inner join masakun c on a.akun_bp=c.kode_akun and c.kode_lokasi ='"+this.app._lokasi+"' "+
						 "                  inner join masakun d on a.akun_deprs=d.kode_akun and d.kode_lokasi ='"+this.app._lokasi+"'  "+	
						 "where a.kode_lokasi='"+this.app._lokasi+"' "+
						 "order by a.kode_klpakun";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];								
			this.sg1.appendData([line.kode_klpakun,line.nama,floatToNilai(line.umur),floatToNilai(line.persen),line.akun,line.bp,line.deprs]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});