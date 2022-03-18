window.app_saku3_transaksi_fa_fEditSawalSusut = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fa_fEditSawalSusut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fa_fEditSawalSusut";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Sawal Susut Aset", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");	

		this.pc1 = new pageControl(this,{bound:[10,18,1000,450], childPage:["Filter Data","Data Susut"]});		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,230,20],caption:"No Bukti",maxLength:10,tag:2,text:"01-SPM06-SAWAL",readOnly:true});		
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"PP / Cabang", multiSelection:false, maxLength:10, tag:2});		
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Akun Akumulasi", multiSelection:false, maxLength:10, tag:2});		
		this.bCari = new button(this.pc1.childPage[0],{bound:[120,13,98,18],caption:"Load Data",click:[this,"doCari"]});			
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
		            colTitle:["No Bukti","ID Barang","Deskripsi","Periode","N Sawal Susut","Nilai Perolehan","PP"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,300,150,100]],					
					columnReadOnly:[true,[0,1,2,3,6],[4,5]],
					colFormat:[[4,5],[cfNilai,cfNilai]], 
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.e_total = new saiLabelEdit(this.sgn,{bound:[790,2,200,20],caption:"Tot Sawal Susut", readOnly:true, tag:1, tipeText:ttNilai,text:"0"});					

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
			
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_akun.setSQL("select distinct a.kode_akun,a.nama from masakun a inner join fa_klpakun b on a.kode_akun=b.akun_deprs and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fa_fEditSawalSusut.extend(window.childForm);
window.app_saku3_transaksi_fa_fEditSawalSusut.implement({
	doChangeCell: function(sender, col, row){
		if (col == 4 && (this.sg1.cells(4,row) != "")) this.sg1.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(4,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);
					this.sg1.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);															
				break;		
			case "simpan" :	
				this.simpan();
				break;					
		}
	},		
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("update fasusut_d set nilai="+nilaiToFloat(this.sg1.cells(4,i))+" where no_fasusut='"+this.sg1.cells(0,i)+"' and no_fa='"+this.sg1.cells(1,i)+"' and periode='"+this.sg1.cells(3,i)+"' and kode_pp='"+this.sg1.cells(6,i)+"' and kode_lokasi='"+this.app._lokasi+"'");

								sql.add("update fa_asset set nilai="+nilaiToFloat(this.sg1.cells(5,i))+" where no_fa='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("update fa_nilai set nilai="+nilaiToFloat(this.sg1.cells(5,i))+" where no_bukti='"+this.sg1.cells(0,i)+"' and no_fa='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");

							}
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
	doCari:function(sender){				
		var strSQL = "select a.*,b.nama,b.nilai as nilai_oleh "+
					 "from fasusut_d a "+ 
					 "inner join "+
					 "fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
					 "inner join "+
					 "fa_klpakun c on b.kode_klpakun=c.kode_klpakun and b.kode_lokasi=c.kode_lokasi "+
					 "where a.no_fasusut='"+this.e_nobukti.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'  and a.kode_pp='"+this.cb_pp.getText()+"' and c.akun_deprs = '"+this.cb_akun.getText()+"' ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			this.sg1.appendData([line.no_fasusut,line.no_fa,line.nama,line.periode,floatToNilai(line.nilai),floatToNilai(line.nilai_oleh),line.kode_pp]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{															
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi.");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert(e);
			}
	    }		
	}
});